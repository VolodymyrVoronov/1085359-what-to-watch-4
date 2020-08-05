import React, {PureComponent} from "react";
import PropTypes from "prop-types";

const Review = {
  MIN_LENGTH: 50,
  MAX_LENGTH: 400,
};

const withAddReview = (Component) => {
  class WithAddReview extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        rating: 5,
        comment: ``,
        isSubmitButtonDisabled: true,
      };

      this._handleRatingChange = this._handleRatingChange.bind(this);
      this._handleReviewChange = this._handleReviewChange.bind(this);
      this._handleReviewFormSubmit = this._handleReviewFormSubmit.bind(this);
    }

    _handleRatingChange(e) {
      this.setState({
        rating: e.target.value,
      });
    }

    _handleReviewChange(e) {
      this.setState({
        comment: e.target.value,
        isSubmitButtonDisabled: (e.target.value.length < Review.MIN_LENGTH) || (e.target.value.length > Review.MAX_LENGTH),
      });
    }

    _handleReviewFormSubmit(e) {
      const {film, onReviewSubmit} = this.props;

      const review = {
        rating: this.state.rating,
        comment: this.state.comment,
      };

      e.preventDefault();
      onReviewSubmit(film.id, review);
    }

    render() {
      return (
        <Component {...this.props}
          onRatingChange={this._handleRatingChange}
          onReviewChange={this._handleReviewChange}
          onReviewFormSubmit={this._handleReviewFormSubmit}
          isSubmitButtonDisabled={this.state.isSubmitButtonDisabled}
        />
      );
    }

  }

  WithAddReview.propTypes = {
    film: PropTypes.shape({
      id: PropTypes.number,
    }).isRequired,
    onReviewSubmit: PropTypes.func.isRequired,
  };

  return WithAddReview;
};

export default withAddReview;
