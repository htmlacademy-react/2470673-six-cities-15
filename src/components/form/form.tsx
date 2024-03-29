import {useState, ChangeEvent, Fragment, FormEvent} from 'react';
import { getAuthorizationStatus } from '../authorizationStatus';
import { AuthorizationStatus } from '../const/const';

type FormProps = {
  onReview: (rating: string, comment: string) => void;
};

function Form({onReview}: FormProps): JSX.Element {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState('0');

  const ratingMap = {
    'perfect': '5',
    'good': '4',
    'not bad': '3',
    'badly': '2',
    'terribly': '1'
  };
  const authorizationStatus = getAuthorizationStatus();
  function handleInputChange(evt: ChangeEvent<HTMLInputElement>) {
    setRating(evt.target.value);
  }

  function handleTextAreaChange(evt: ChangeEvent<HTMLTextAreaElement>) {
    setComment(evt.target.value);
  }

  return (

    <form className="reviews__form form" action="#" method="post"
      onSubmit={(evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        onReview(rating, comment);
      }}
    >

      {authorizationStatus === AuthorizationStatus.Auth ? (

        <div>
          <label className="reviews__label form__label" htmlFor="review">
        Your review
          </label>
          <div className="reviews__rating-form form__rating">
            {
              Object.entries(ratingMap).map(([title, score]) => (
                <Fragment key={score}>
                  <input
                    className="form__rating-input visually-hidden"
                    name="rating"
                    value={score}
                    id={`${score}-stars`}
                    type="radio"
                    checked={rating === score}
                    onChange={handleInputChange}
                  />
                  <label
                    htmlFor={`${score}-stars`}
                    className="reviews__rating-label form__rating-label"
                    title={title}
                  >
                    <svg className="form__star-image" width="37" height="33">
                      <use xlinkHref="#icon-star"></use>
                    </svg>
                  </label>
                </Fragment>
              ))
            }
          </div>
          <textarea
            className="reviews__textarea form__textarea"
            id="review"
            name="review"
            placeholder="Tell how was your stay, what you like and what can be improved"
            value={comment}
            onChange={handleTextAreaChange}
          />
          <div className="reviews__button-wrapper">
            <p className="reviews__help">
          To submit review please make sure to set{''}
              <span className="reviews__star">rating</span> and describe
            your stay with at least{''}
              <b className="reviews__text-amount">50 characters</b>.
            </p>
            <button
              className="reviews__submit form__submit button"
              type="submit"
            >
          Submit
            </button>
          </div>
        </div>
      ) : null}

    </form>
  );
}

export default Form;
