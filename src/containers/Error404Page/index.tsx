import React, {useEffect, useState} from 'react';
import {bindActionCreators, Dispatch} from 'redux';
import {connect} from 'react-redux';
import nprogress from 'accessible-nprogress';
import dataAction from '../../actions/dataAction';
import Header from '../../components/Header';
import ErrorBox from '../../components/Error404Components/ErrorBox';
import { CommonDataModel } from '../../model/common-data.model';
import './styles.scss';

const parentField = "Business";

interface IError404PageProps {
  error404Content: any;
  headerMenus: {[parentField: string]: CommonDataModel};
  dataAction?: any;
}

const Error404Page: React.FunctionComponent<IError404PageProps> = (props) => {
  const [headerMenu, setHeaderMenu] = useState<CommonDataModel>();
  
  useEffect(() => {
    nprogress.configure({parent: 'main'});
    nprogress.start();
    props.dataAction.getError404ContentData();
    props.dataAction.getHeaderMenuData(parentField);
  }, [props.dataAction]);
  
  useEffect(() => {
    if (props.headerMenus && props.headerMenus[String(parentField)]) {
      setHeaderMenu(props.headerMenus[String(parentField)]);
    }
  }, [props.headerMenus]);

  nprogress.done();

  return (
    <React.Fragment>     
      {!!headerMenu && (
        <Header
          hasShadow={true}
          activeMenu={parentField}
          dataList={headerMenu}
          headers={props.headerMenus}
          dataAction={props.dataAction} />
      )}
      
      {!!props.error404Content && (
        <ErrorBox
          dataList={props.error404Content.data.attributes} />
      )}
    </React.Fragment>
  );
};

const mapStateToProps = (state: any) => ({...state.dataReducer});

const matchDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators({}, dispatch),
  dataAction: bindActionCreators({...dataAction}, dispatch),
});

export default connect(mapStateToProps, matchDispatchToProps)(Error404Page);
