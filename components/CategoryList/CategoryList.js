import React, { PropTypes } from 'react'
import s from './CategoryList.css'
import Category from '../Category'
import icons from '../../icons/css/icons.css'
import { categories } from '../../lib/categories' // This should eventuall go away when firebase has icons

const CategoryList = (props) => (
  <ul title="Services" className={`${s.categories} btn-group`}>
    {categories.map((category, index) => (
      <li key={index} className={s.categoryItem}>
        <Category key={`category-${index}`} iconClass={category.icon} name={category.name} />
      </li>
    ))}
  </ul>
)

CategoryList.propTypes = {
  categories: PropTypes.array.isRequired,
}

export default CategoryList