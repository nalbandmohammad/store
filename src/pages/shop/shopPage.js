import React, {Component} from "react";

import {Route} from 'react-router-dom';

import {connect} from 'react-redux';

import WithSpinner from '../../components/with-spinner/with-spinner';

import CollectionsOverview from "../../components/collections-overview/collections-overview";

import CollectionPage from '../collection/collection';

import {firestore, convertCollectionsSnapshotToMap} from '../../firebase/firebase.utils';

import {updateCollections} from '../../redux/shop/shop.actions';

const CollectionsOveriewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends Component{

  state = {
    loading: true
  }
  
  unsubscribeFromSnapshot = null;

  componentDidMount(){

    const {updateCollections} = this.props;

    const collectionRef = firestore.collection('collections');

    collectionRef.onSnapshot(async snapshot => {
      const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
      console.log(collectionsMap);
      updateCollections(collectionsMap);
      this.setState({loading:false})
    });

  }


  render(){
    const {match} = this.props;
    const {loading} = this.state;
    return(
        <div className="shop-page">
        <Route exact path={`${match.path}`} render={(props) => <CollectionsOveriewWithSpinner isLoading={loading} {...props}/>} />
        <Route path={`${match.path}/:collectionId`} render={(props) => <CollectionPageWithSpinner isLoading={loading} {...props}/>} />
        {/* <Route exact path={`${match.path}`} component={CollectionsOverview} />
        <Route path={`${match.path}/:collectionId`} component={CollectionPage} /> */}
      </div>
    );
  }
}

// const ShopPage = ({match}) => (
//   <div className="shop-page">
//         <Route exact path={`${match.path}`} component={CollectionsOverview} />
//         <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
//       </div>
// ); 

const mapDispatchToProps = dispatch => ({
  updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
})



export default connect(null, mapDispatchToProps)(ShopPage);
