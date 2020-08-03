import React from "react";
import renderer from "react-test-renderer";
import Reviews from "./reviews.jsx";

const REVIEWS = [
  {
    id: 1,
    user: {
      id: 1,
      name: `Kate Muir`,
    },
    comment: `Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.`,
    date: `December 24, 2016`,
    rating: 8.9,
  },
  {
    id: 2,
    user: {
      id: 2,
      name: `Bill Goodykoontz`,
    },
    comment: `Anderson's films are too precious for some, but for those of us willing to lose ourselves in them, they're a delight. "The Grand Budapest Hotel" is no different, except that he has added a hint of gravitas to the mix, improving the recipe.`,
    date: `November 18, 2015`,
    rating: 8.0,
  },
  {
    id: 3,
    user: {
      id: 3,
      name: `Amanda Greever`,
    },
    comment: `I didn't find it amusing, and while I can appreciate the creativity, it's an hour and 40 minutes I wish I could take back.`,
    date: `November 18, 2015`,
    rating: 8.0,
  },
  {
    id: 4,
    user: {
      id: 4,
      name: `Matthew Lickona`,
    },
    comment: `The mannered, madcap proceedings are often delightful, occasionally silly, and here and there, gruesome and/or heartbreaking.`,
    date: `December 20, 2016`,
    rating: 7.2,
  },
  {
    id: 5,
    user: {
      id: 5,
      name: `Paula Fleri-Soler`,
    },
    comment: `It is certainly a magical and childlike way of storytelling, even if the content is a little more adult.`,
    date: `December 20, 2016`,
    rating: 7.6,
  },
  {
    id: 6,
    user: {
      id: 6,
      name: `Paula Fleri-Soler`,
    },
    comment: `It is certainly a magical and childlike way of storytelling, even if the content is a little more adult.`,
    date: `December 20, 2016`,
    rating: 7.0,
  },
];

it(`render should be match markup`, () => {

  const result = renderer
    .create(<Reviews
      reviews={REVIEWS}
    />)
    .toJSON();

  expect(result).toMatchSnapshot();
});
