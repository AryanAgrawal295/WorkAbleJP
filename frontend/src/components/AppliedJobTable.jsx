import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'

const AppliedJobTable = () => {
    const { allAppliedJobs = [] } = useSelector(store => store.job) || {}; // 

    return (
        <div>
            <Table>
                <TableCaption>A list of your applied jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Job Role</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {allAppliedJobs.length > 0 ? (
                        allAppliedJobs.map((appliedJob) => (
                            <TableRow key={appliedJob?._id || Math.random()}>
                                <TableCell>{appliedJob?.createdAt?.split("T")[0] || 'N/A'}</TableCell>
                                <TableCell>{appliedJob?.job?.title || 'N/A'}</TableCell>
                                <TableCell>{appliedJob?.job?.company?.name || 'N/A'}</TableCell>
                                <TableCell className="text-right">
                                    <Badge className={`${
                                        appliedJob?.status === "rejected" ? 'bg-red-500' 
                                        : appliedJob?.status === 'pending' ? 'bg-gray-500' 
                                        : 'bg-green-500'
                                    }`}>
                                        {appliedJob?.status?.toUpperCase() || 'UNKNOWN'}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center py-4">
                                You haven't applied for any jobs yet.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}

export default AppliedJobTable;
