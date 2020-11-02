import client from './client';

const endpoint = '/listings';

const getListings = () => client.get(endpoint);

const addListing = (listing) => {
  const data = new FormData();

  data.append('title', listing.title);
  data.append('price', listing.price);
  data.append('categoryId', listing.category.value);
  data.append('description', listing.category.value);

  listing.images.forEach((image, index) => {
    data.append('images', {
      name: 'image' + index,
      type: 'image/jpeg',
      uri: image,
    });
  });

  if (listing.location)
    data.append('location', JSON.stringify(listing.location));

  client.post(endpoint, data);
};

export default {
  addListing,
  getListings,
};