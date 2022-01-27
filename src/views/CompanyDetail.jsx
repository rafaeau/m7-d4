import React from 'react';
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const fetchCompany = async (companyName) => {
    let response = await fetch(`https://strive-jobs-api.herokuapp.com/jobs?company=${companyName}`);
    let company = await response.json();
    return company;
};

export default function CompanyDetail() {
    let { company } = useParams();

    const [companyJobs, setCompanyJobs] = useState([]);

    useEffect(() => {
        fetchCompany(company).then((res) => setCompanyJobs(res));
    }, []);

    return (
        <>
            <h3 className='mt-3 mb-4'>{company} jobs:</h3>
            {companyJobs.data && companyJobs.data.map(job =>
                <div key={job._id}>
                    <h5>{job.title}</h5>
                    <hr />
                </div>
            )}
        </>
    );

}