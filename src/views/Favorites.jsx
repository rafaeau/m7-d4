import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { BsFillTrashFill } from "react-icons/bs";
import { Button } from 'react-bootstrap';
import { delFromFavoritesAction } from "../redux/actions";

const mapStateToProps = (state) => ({
    favorites: state.favorites,
  })

const mapDispatchToProps = (dispatch) => ({
    delFromFavorites: (i) => {
      dispatch(delFromFavoritesAction(i))
    }
})

const Favorites = ({ favorites, delFromFavorites }) => (
    <>

        <h3 className='mt-3 mb-4'>Favorite jobs:</h3>
        {favorites && favorites.map((job, i) => (
            <div key={job._id} className='d-flex'>
                <h5>{job.title}</h5>
                <h6 className="mb-2 mt-1 ml-1">at <Link to={'/' + job.company_name}>{job.company_name}</Link></h6>
                <span>
                    <Button className='del-btn btn-sm ml-2' onClick={() => {
                        delFromFavorites(i)
                    }}>
                        <BsFillTrashFill/>
                    </Button>
                </span>
                <hr />
            </div>
        ))}

    </>
);

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);