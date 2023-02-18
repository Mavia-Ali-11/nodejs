
const asyncHandler = require("express-async-handler");
const { Product } = require("../models");
const _ = require("lodash");

// const getProducts = asyncHandler(async (req, res) => {
//     try {
//         const { search, price, sort, select, page, limit, ...rest } = req.query;
//         let query = rest;
//         let sortKeys = sort && sort.replaceAll(",", " ");
//         let selectKeys = select && select.replaceAll(",", " ");
//         let limiter = page || limit ? (limit || 4) : "";
//         let paginate = page * limiter;
//         if (search) {
//             query["$or"] = [
//                 { company: { $regex: search, $options: "i" } },
//                 { name: { $regex: search, $options: "i" } },
//             ]
//         }
//         if (price) {
//             query.price = { $lte: price }
//         }
//         const response = await Product.find(query).skip(paginate).limit(limiter).sort(sortKeys).select(selectKeys);
//         res.json({ response, count: response.length })
//     } catch(e) {
//         console.error(e);
//         res.json({ message: e });
//     }
// });

const getProducts = asyncHandler(async (req, res) => {
    try {
        const { search, price, sort, select, page, limit, featured, rating } = req.query;

        let pipeline = [
            {
                $unwind: {
                    path: "$sellingBranches",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: "branches",
                    let: { "branchId": { $toObjectId: "$sellingBranches" } },
                    pipeline: [
                        { $match: { $expr: { $eq: ["$_id", "$$branchId"] } } },
                        { $project: { "_id": 0, "__v": 0 } }
                    ],
                    as: "sellingBranches"
                }
            },
            {
                $group: {
                    _id: "$_id",
                    name: { $first: "$name" },
                    price: { $first: "$price" },
                    featured: { $first: "$featured" },
                    rating: { $first: "$rating" },
                    company: { $first: "$company" },
                    image: { $first: "$image" },
                    sellingBranches: { $push: { $first: "$sellingBranches" } },
                }
            },
            {
                $sort: { "_id": 1 }
            },
        ];

        if (page || limit) {
            const limiter = limit || 4;

            if (page) {
                const paginationStage = { $skip: page * limiter };
                pipeline.push(paginationStage);
            }

            const limitStage = { $limit: Number(limiter) };
            pipeline.push(limitStage);
        }

        const matchStage = {
            $match: {}
        };
        if (search) {
            matchStage.$match.$or = [
                { name: { $regex: search, $options: "i" } },
                { company: { $regex: search, $options: "i" } }
            ];
        }
        if (price) matchStage.$match.price = { $lte: Number(price) };
        if (featured) matchStage.$match.featured = featured === "true";
        if (rating) matchStage.$match.rating = { $gte: Number(rating) };
        pipeline.push(matchStage);

        if (sort) {
            const sortKey = sort.replaceAll("-", "");
            const sortOrder = sort.slice(0, 1) !== "-" ? 1 : -1;
            pipeline.push({ $sort: { [sortKey]: sortOrder } });
        }

        if (select) {
            const selectStage = { $project: {} };
            const selectKeys = select.split(",");
            selectKeys.forEach(key => selectStage.$project[key] = 1);
            pipeline.push(selectStage);
        }

        const response = await Product.aggregate(_.compact(pipeline));
        res.json({ count: response.length, response })
    } catch (e) {
        console.error(e);
        res.json({ message: e });
    }
});

const getProductById = asyncHandler(async (req, res) => {
    try {
        const response = await Product.findById(req.params.id);
        res.json({ response });
    } catch (e) {
        console.error(e);
        res.json({ message: e });
    }
});

const getProductsStats = asyncHandler(async (req, res) => {
    try {
        const response = await Product.aggregate([
            {
                $group: {
                    _id: "$company",
                    numberOfProducts: { $sum: 1 },
                    averagePrice: { $avg: "$price" },
                    averageRating: { $avg: "$rating" },
                    expensive: {
                        $max: {
                            price: "$price",
                            name: "$name",
                            sellingBranches: { $size: "$sellingBranches" }
                        }
                    },
                    cheapest: {
                        $min: {
                            price: "$price",
                            name: "$name",
                            sellingBranches: { $size: "$sellingBranches" }
                        }
                    },
                }
            },
            {
                $sort: { averagePrice: 1 }
            }
        ]);
        res.json({ response, count: response.length });
    }
    catch (e) {
        console.error(e);
        res.json({ message: e });
    }
});

const createProduct = asyncHandler(async (req, res) => {
    try {
        const product = new Product({
            name: req.body.name,
            price: req.body.price,
            featured: req.body.featured,
            rating: req.body.rating,
            company: req.body.company,
            sellingBranches: req.body.sellingBranches
        });
        if(req.files) {
            for(const file of req.files) {
                product[file.fieldname] = file.filename;
            }
        }

        await product.save();
        res.json({ message: "Product added successfully!" });
    } catch (e) {
        console.error(e);
        res.json({ message: e });
    }
});

const updateProduct = asyncHandler(async (req, res) => {
    try {
        const updatedProduct = {
            name: req.body.name,
            price: req.body.price,
            featured: req.body.featured,
            rating: req.body.rating,
            company: req.body.company,
            sellingBranches: req.body.sellingBranches
        }
        if(req.files) {
            for(const file of req.files) {
                updatedProduct[file.fieldname] = file.filename; 
            }
        }

        const response = await Product.findOneAndUpdate(
            { _id: req.params.id },
            { $set: updatedProduct },
            { new: true, runValidators: true }
        );

        res.json({ response, message: "Product updated successfully!" })
    } catch (e) {
        console.error(e);
        res.json({ message: e });
    }
});

const deleteProduct = asyncHandler(async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id)
        res.json({ message: "Product deleted successfully!" });
    } catch (e) {
        console.error(e);
        res.json({ message: e });
    }
});

module.exports = { getProducts, getProductById, getProductsStats, createProduct, updateProduct, deleteProduct };