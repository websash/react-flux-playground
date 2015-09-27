import React, {PropTypes} from 'react'
import {Link} from 'react-router'
import Spinner from '../Spinner'
import CategoriesStore from '../../stores/CategoriesStore'
import ProductsStore from '../../stores/ProductsStore'
import storesConnector from '../../utils/storesConnector'
import * as acr from '../../actionCreators'
import joinClasses from 'react/lib/joinClasses'
import s from './Categories.css'

function stateFromStores(props) {
  return { categories: CategoriesStore.getCategories() }
}

@storesConnector([CategoriesStore], stateFromStores)
class Categories extends React.Component {

  static propTypes = {
    categories: PropTypes.array,
    category: PropTypes.object,
    className: PropTypes.string
  }

  componentWillMount() {
    acr.requestCategories(this.props)
  }

  render() {
    const {categories, category, className} = this.props
    const curCatId = category && category.id

    return (
      <aside className={joinClasses(s.aside, className)}>
        <h3 className={s.heading}>
          Categories <Spinner active={CategoriesStore.pending} />
        </h3>

        <ul className={joinClasses(s.links, 'fadetarget')}>
        {
          categories.map(cat =>
            <li key={cat.id} className={curCatId == cat.id ? 'active' : ''}>
              <Link to={`/products/category/${cat.id}`}>{cat.name}</Link>
            </li>)
        }
        </ul>
      </aside>
      )
  }

}

export default Categories
