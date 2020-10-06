import React from 'react'

export default function Rating(props) {
    const { rating, numReviews } = props;
    return (
        <div className="rating">
            <span><i className={rating >= 1 ? "fa fa-star" : rating >= 0.5 ? 'fa fa-star-half-o' : 'fa fa-star-o' }></i></span>
            <span><i className={rating >= 2 ? "fa fa-star" : rating >= 1.5 ? 'fa fa-star-half-o' : 'fa fa-star-o' }></i></span>
            <span><i className={rating >= 3 ? "fa fa-star" : rating >= 2.5 ? 'fa fa-star-half-o' : 'fa fa-star-o' }></i></span>
            <span><i className={rating >= 4 ? "fa fa-star" : rating >= 3.5 ? 'fa fa-star-half-o' : 'fa fa-star-o' }></i></span>
            <span><i className={rating >= 5 ? "fa fa-star" : rating >= 4.5 ? 'fa fa-star-half-o' : 'fa fa-star-o' }></i></span>
    <span> {numReviews} {numReviews === 1 || (numReviews>20 && numReviews %10 === 1) ? "Įvertinimas" :
       (numReviews > 1 && numReviews < 10) || (numReviews %10 > 1 && numReviews % 10 < 10 && numReviews > 20)? 'Įvertinimai':
       numReviews === 0 || (numReviews > 9 && numReviews < 21) || numReviews%10 === 0? "Įvertinimų":"Įvertinimas(ų)(ai)" 
       }</span>
        </div>
    );
}
