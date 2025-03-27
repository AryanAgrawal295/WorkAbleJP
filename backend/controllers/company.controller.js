import { Company } from "../models/company.model.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const registerCompany = async (req, res) => {
    try {
        const { companyName, description, website, location, logo } = req.body;
        const userId = req.user?._id; // Ensure user is authenticated

        if (!userId) {
            return res.status(401).json({
                message: "User not authenticated.",
                success: false
            });
        }

        if (!companyName) {
            return res.status(400).json({
                message: "Company name is required.",
                success: false
            });
        }

        // Check if a company with the same name already exists
        let company = await Company.findOne({ name: companyName });
        if (company) {
            return res.status(400).json({
                message: "A company with this name already exists.",
                success: false
            });
        }

        // Create a new company with all possible fields
        company = await Company.create({
            name: companyName,
            description,
            website,
            location,
            logo,
            userId
        });

        return res.status(201).json({
            message: "Company registered successfully.",
            company,
            success: true
        });
    } catch (error) {
        console.error("Error registering company:", error);
        return res.status(500).json({
            message: "Server error.",
            success: false,
            error: error.message
        });
    }
};

export const getCompany = async (req, res) => {
    try {
        const userId = req.user?._id; // logged in user id
        const companies = await Company.find({ userId });
        if (!companies) {
            return res.status(404).json({
                message: "Companies not found.",
                success: false
            })
        }
        return res.status(200).json({
            companies,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}
// get company by id
export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({
                message: "Company not found.",
                success: false
            })
        }
        return res.status(200).json({
            company,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
export const updateCompany = async (req, res) => {
    try {
        const { name, description, website, location } = req.body;
        let updateData = { name, description, website, location };

        if (req.file) {
            const fileUri = getDataUri(req.file);
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
            updateData.logo = cloudResponse.secure_url;
        }

        const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });

        if (!company) {
            return res.status(404).json({
                message: "Company not found.",
                success: false
            });
        }

        return res.status(200).json({
            message: "Company information updated.",
            success: true
        });

    } catch (error) {
        console.error("Error updating company:", error);
        return res.status(500).json({ message: "Server error", success: false });
    }
};

