import React from 'react';
import { FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { AiFillStar } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';

const mapStateToProps = state => state

const mapDispatchToProps = (dispatch) => ({
    addToFavorites: (job) => {
        dispatch({
            type: 'ADD_TO_FAVORITES',
            payload: job
        })
    },
})

const fetchJobs = async () => {
    const resp = await fetch('https://strive-jobs-api.herokuapp.com/jobs?limit=30')
    if (resp.ok) {
        let jobs = await resp.json();
        return jobs;
    }
}

const fetchCategoriesNames = async () => {
    let resp = await fetch('https://strive-jobs-api.herokuapp.com/jobs/categories');
    if (resp.ok) {
        let categories = await resp.json();
        return categories;
    }
}

const fetchCategory = async (category) => {
    let resp = await fetch(`https://strive-jobs-api.herokuapp.com/jobs?category=${category}&limit=10`);
    if (resp.ok) {
        let categoryContent = await resp.json();
        return categoryContent
    }
}

function Homepage (props) {

    const navigate = useNavigate()

    const [jobs, setJobs] = useState([]);
    const [search, setSearch] = useState([]);
    const [category, setCategory] = useState([]);
    const [categoriesNames, setCategoriesNames] = useState([]);

    useEffect(() => {
        fetchJobs().then((res) => setJobs(res));
        fetchCategory().then((res) => setCategory(res));
        fetchCategoriesNames().then((res) => setCategoriesNames(res));
    }, []);

    return (
        <>
            <h3 className='my-3'>Tech jobs search</h3>
            <FormControl
                className='my-3'
                placeholder="Search jobs"
                value={search.value}
                onChange={(e) => setSearch({ search: e.currentTarget.value.toLowerCase() })}
            />

            <h5 className='my-3'>Filter by category:</h5>
            <div className='btn-wrap'>
                {categoriesNames && categoriesNames.map(category =>
                    <span key={category}>
                        <Button className='button' onClick={() => {
                            fetchCategory(category);
                        }}>{category}</Button>
                    </span>
                )}
            </div>

            <Button color="primary" className='fav-btn mb-4 mt-1' onClick={() => navigate("/favorites")}>
                <AiFillStar className='mt-n1' /> Favorites
            </Button>

            {jobs.data && jobs.data.filter(job => job.title.toLowerCase().indexOf(search) !== -1).map(job =>
                <div key={job._id} className='d-flex'>
                    <h5>{job.title}</h5>
                    <h6 className="mb-2 mt-1 ml-1">at <Link to={'/' + job.company_name}>{job.company_name}</Link></h6>
                    <span>
                        <Button className='fav-btn btn-sm ml-2' onClick={() => {
                            props.addToFavorites(job)
                        }}>
                            +
                        </Button>
                    </span>
                    <hr />
                </div>
            )}

        </>
    );

}

export default connect(mapStateToProps, mapDispatchToProps)(Homepage)