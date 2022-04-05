import React, { useEffect, useState } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import nprogress from 'accessible-nprogress';
import dataAction from '../../actions/dataAction';
import dataSvc from '../../services/dataSvc';
import Header from '../../components/Header';
import TopBanner from '../../components/TopBanner';
import Teams from '../../components/MeetTheTeamComponents/Teams';
import CustomerFeedback from '../../components/MeetTheTeamComponents/CustomerFeedback';
import Breadcrumb from '../../components/Breadcrumb';
import Footer from '../../components/Footer';
import LowestFooter from '../../components/LowestFooter';
import { CommonDataModel } from '../../model/common-data.model';
import './styles.scss';

const parentField = 'Private Banking';

interface IMeetTheTeamPageProps {
  meetTheTeamContent: any;
  banner: CommonDataModel;
  teams: CommonDataModel;
  customerFeedback: CommonDataModel;
  headerMenus: { [parentField: string]: CommonDataModel };
  footer: CommonDataModel;
  dataAction?: any;
}

const MeetTheTeamPage: React.FunctionComponent<IMeetTheTeamPageProps> = (
  props,
) => {
  const [title, setTitle] = useState<string>('');
  const [banner, setBanner] = useState<CommonDataModel>();
  const [teams, setTeams] = useState<CommonDataModel>();
  const [customerFeedback, setCustomerFeedback] = useState<CommonDataModel>();
  const [headerMenu, setHeaderMenu] = useState<CommonDataModel>();
  const [footer, setFooter] = useState<CommonDataModel>();

  const breadcrumbArray = [
    {
      label: 'Home',
      url: '/',
    },
    {
      label: 'Private Banking',
      url: '#',
    },
    {
      label: 'Meet the Team',
      url: '#',
    },
  ];

  useEffect(() => {
    nprogress.configure({ parent: 'main' });
    nprogress.start();
    props.dataAction.getMeetTheTeamContentData();
    props.dataAction.getHeaderMenuData(parentField);
    props.dataAction.getFooterData();
  }, [props.dataAction]);

  useEffect(() => {
    if (props.meetTheTeamContent) {
      setTitle(props.meetTheTeamContent.data.attributes.body.value);

      dataSvc
        .getMeetTheTeamBannerData(props.meetTheTeamContent.data.id)
        .then((data) => {
          setBanner(data);
        });

      const getTeamId = (data: any) => data instanceof Array ? data.length && data[0].id : data.id;
      dataSvc
        .getMeetTheTeamTeamsData(
          getTeamId(props.meetTheTeamContent.data.relationships.field_team_members.data)
        )
        .then((data) => {
          setTeams(data);
        });

      dataSvc
        .getMeetTheTeamCustomerFeedbackData(props.meetTheTeamContent.data.id)
        .then((data) => {
          setCustomerFeedback(data);
        });
    }
    // eslint-disable-next-line
  }, [props.meetTheTeamContent]);

  useEffect(() => {
    if (props.headerMenus && props.headerMenus[String(parentField)]) {
      setHeaderMenu(props.headerMenus[String(parentField)]);
    }
  }, [props.headerMenus]);
  useEffect(() => {
    if (props.footer) {
      setFooter(props.footer);
    }
  }, [props.footer]);

  nprogress.done();

  return (
    <React.Fragment>
      {!!headerMenu && (
        <Header
          activeMenu={parentField}
          dataList={headerMenu}
          headers={props.headerMenus}
          dataAction={props.dataAction}
        />
      )}

      {!!banner && <TopBanner dataList={banner} type="meet-team-banner" />}

      <Breadcrumb itemArray={breadcrumbArray} />

      {!!teams && <Teams title={title} dataList={teams} />}

      {!!customerFeedback && <CustomerFeedback dataList={customerFeedback} />}

      <div className="footer">
        {!!footer && <Footer dataList={footer} />}

        {!!footer && <LowestFooter dataList={footer} />}
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state: any) => ({ ...state.dataReducer });

const matchDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators({}, dispatch),
  dataAction: bindActionCreators({ ...dataAction }, dispatch),
});

export default connect(mapStateToProps, matchDispatchToProps)(MeetTheTeamPage);
