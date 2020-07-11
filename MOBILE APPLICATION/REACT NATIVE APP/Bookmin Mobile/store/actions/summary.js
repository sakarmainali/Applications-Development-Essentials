import Product from '../../models/summary';

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';




export const fetchProducts = () => {
  return async (dispatch, getState) => {
    // any async code you want!
    const userId = getState().auth.userId;
    const uname = getState().auth.uname;
    console.log("USERID TEST//////");
    console.log(userId);
    console.log(uname);
;    try {
      const response = await fetch(
        'https://book-min.herokuapp.com/api/summary'
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const resData = await response.json();
      const loadedProducts = []

      for (const key in resData.summaries) {

        

        loadedProducts.push(
          new Product(
            resData.summaries[key].id,
            resData.summaries[key].creator_id,
            resData.summaries[key].summary_title,
            resData.summaries[key].summary_title,
            resData.summaries[key].book_description,
            resData.summaries[key].summary_body,
            uname

          )
        );
      }


      dispatch({
        type: SET_PRODUCTS,
        products: loadedProducts,
        userProducts: loadedProducts.filter(prod => prod.ownerId === userId)
      });

    } catch (err) {
      // send to custom analytics server
      throw err;
    }
  };
};

export const deleteProduct = productId => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(
      `https://book-min.herokuapp.com/api/summary/${productId}`,
      {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer ' + token
        }
      }
    );

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }
    dispatch({ type: DELETE_PRODUCT, pid: productId });
  };
};

export const createProduct = (title, description, imageUrl, body) => {
  return async (dispatch, getState) => {
    // any async code you want!
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const response = await fetch(
      `https://book-min.herokuapp.com/api/summary`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
          summary_title:title,
          book_description:description,
          image:imageUrl,
          summary_body:body
        }),
        
      }
    );

    console.log("WHYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY*************");

    const resData = await response.json();

    console.log(resData);
    console.log("WHYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY*************");
    

    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: resData.summary._id,
        title,
        description,
        imageUrl,
        body,
        ownerId: userId
      }
    });
  };
};

export const updateProduct = (id, title, description, imageUrl ,body) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(
      `https://book-min.herokuapp.com/api/summary/${id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
          body
        })
      }
    );

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }

    dispatch({
      type: UPDATE_PRODUCT,
      pid: id,
      productData: {
        title,
        description,
        imageUrl,
        body
      }
    });
  };
};
