import Form from '../form/form';
import ReviewItem from '../review-item/reviewItem';
import { Reviews } from '../types/types';


type ReviewsListProps = {
  reviews: Reviews;
  onReview: (rating: string, comment: string) => void;
};

function ReviewsList({reviews, onReview}: ReviewsListProps): JSX.Element {
  return (
    <section className="offer__reviews reviews">
      {reviews.map((review) => {
        const keyValue = review.id;
        return (
          <ReviewItem key = {keyValue} reviewItem = {review} />
        );
      })}
      <Form onReview = {onReview} />
    </section>
  );
}

export default ReviewsList;
