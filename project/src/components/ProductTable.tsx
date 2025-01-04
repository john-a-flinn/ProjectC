import React from 'react';
import { Product } from '@prisma/client';

type Props = {
  products: Product[];
};

const ProductTable: React.FC<Props> = ({ products }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>MFR</th>
          <th>Type Name</th>
          <th>Type ID</th>
          <th>Style Name</th>
          <th>Style ID</th>
          <th>Color Number</th>
          <th>Color Name</th>
          <th>Size</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td>{product.mfr}</td>
            <td>{product.type_name}</td>
            <td>{product.type_id}</td>
            <td>{product.style_name || 'N/A'}</td>
            <td>{product.style_id || 'N/A'}</td>
            <td>{product.color_number !== null ? product.color_number : 'N/A'}</td>
            <td>{product.color_name || 'N/A'}</td>
            <td>{product.size || 'N/A'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;