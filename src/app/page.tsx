import { AppDispatch } from "@/lib/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector(selectAllProduct);
  const productsStatus = useSelector(getProductsStatus);
  const error = useSelector(getProductsError);

  useEffect(() => {
    if (productsStatus === "idle") {
      dispatch(fetchProducts());
    }
  }, [productsStatus, dispatch]);

  return (
    <div>
      <h1>Products</h1>
      {productsStatus === "loading" && <div>Loading...</div>}
      {productsStatus === "succeeded" && (
        <ul>
          {products.map((product) => (
            <li key={product.id}>{product.title}</li>
          ))}
        </ul>
      )}
      {productsStatus === "failed" && <div>{error}</div>}
    </div>
  );
}
