import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";
import Notification from "../models/Notification.js";
import User from "../models/user.model.js";

export const applyJob = async (req, res) => {
    try {
        const userId = req.user?._id;
        const jobId = req.params.id;
        console.log(jobId)
        console.log(userId)

        if (!userId) {
            return res.status(401).json({ message: "User not authenticated.", success: false });
        }

        if (!jobId) {
            return res.status(400).json({ message: "Job ID is required.", success: false });
        }

       
        const existingApplication = await Application.findOne({ job: jobId, applicant: userId });
        if (existingApplication) {
            return res.status(400).json({ message: "You have already applied for this job.", success: false });
        }

       
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: "Job not found.", success: false });
        }

        const newApplication = await Application.create({ job: jobId, applicant: userId });

        
        job.applications.push(newApplication._id);
        await job.save();

        await Notification.create({
            user: job.created_by,
            message: `A new application has been received for the job: ${job.title}`,
            type: "job_application"
        });

        return res.status(201).json({ message: "Job applied successfully.", success: true });

    } catch (error) {
        console.error("Error applying for job:", error);
        return res.status(500).json({ message: "Server error.", success: false, error: error.message });
    }
};


export const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.user?._id;
        const application = await Application.find({ applicant: userId })
            .sort({ createdAt: -1 })
            .populate({
                path: 'job',
                populate: { path: 'company' }
            });

        if (!application.length) {
            return res.status(404).json({ message: "No Applications", success: false });
        }

        return res.status(200).json({ application, success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error", success: false });
    }
};

export const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: 'applications',
            populate: { path: 'applicant' }
        });

        if (!job) {
            return res.status(404).json({ message: 'Job not found.', success: false });
        }

        return res.status(200).json({ job, success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error", success: false });
    }
};

export const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const applicationId = req.params.id;
        if (!status) {
            return res.status(400).json({ message: 'Status is required', success: false });
        }

        const application = await Application.findById(applicationId).populate("job applicant");
        if (!application) {
            return res.status(404).json({ message: "Application not found.", success: false });
        }

        application.status = status.toLowerCase();
        await application.save();

        await Notification.create({
            user: application.applicant._id,
            message: `Your application for the job '${application.job.title}' has been ${status.toLowerCase()}.`,
            type: "application_status"
        });

        return res.status(200).json({ message: "Status updated successfully.", success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error", success: false });
    }
};
