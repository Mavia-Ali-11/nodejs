
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
                    path: "$sellingBranch",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: "branches",
                    let: { "branchId": { $toObjectId: "$sellingBranch" } },
                    pipeline: [
                        { "$match": { "$expr": { "$eq": ["$_id", "$$branchId"] } } },
                        { "$project": { "_id": 0, "__v": 0 } }
                    ],
                    as: "sellingBranch"
                }
            },
            {
                $group: {
                    _id: "$_id",
                    name: { $first: "$name" },
                    sellingBranch: { $push: "$sellingBranch" },
                }
            }
        ];

        if (page || limit) {
            const limiter = page || limit ? (limit || 4) : "";

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
        if (featured) matchStage.$match.featured = featured === "true" || false;
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
                    count: { $sum: 1 },
                    averageRating: { $avg: "$rating" },
                    averagePrice: { $avg: "$price" },
                    expensive: { $max: { price: "$price", name: "$name", featured: "$featured" } },
                    cheapest: { $min: { price: "$price", name: "$name", featured: "$featured" } },
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
    }
});

const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        featured: req.body.featured,
        rating: req.body.rating,
        company: req.body.company,
        branches: req.body.branches
    });

    product.save()
        .then(() => res.json({ message: "Product added successfully!" }))
        .catch(error => res.json({ error, message: "Error occurred while adding product" }))
});

const updateProduct = asyncHandler(async (req, res) => {
    const updatedProduct = {
        name: req.body.name,
        price: req.body.price,
        featured: req.body.featured,
        rating: req.body.rating,
        company: req.body.company,
        branches: req.body.branches
    }

    Product.findOneAndUpdate({ _id: req.params.id }, { $set: updatedProduct }, { new: true, runValidators: true })
        .then(response => res.json({ response, message: "Product updated successfully!" }))
        .catch(error => res.json({ error, message: "Error occurred while adding product" }))
});

const deleteProduct = asyncHandler(async (req, res) => {
    Product.findByIdAndDelete(req.params.id)
        .then(() => res.json({ message: "Product deleted successfully!" }))
        .catch(error => res.json({ error, message: "Error occurred while deleting product" }))
});

module.exports = { getProducts, getProductById, getProductsStats, createProduct, updateProduct, deleteProduct };