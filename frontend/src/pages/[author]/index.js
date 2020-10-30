import React from 'react';
import Head from 'next/head'

import API from '../../modules/api';
import Global from '../../modules/global';

import Profile from '../../components/profile/Profile';
import Heatmap from '../../components/profile/Heatmap';
import HeatmapDark from '../../components/profile/HeatmapDark';
import ViewCounter from '../../components/profile/ViewCounter';
import RecentActivity from '../../components/profile/RecentActivity';
import FeatureContent from '../../components/profile/FeatureContent';

export async function getServerSideProps(context) {
    const raise = require('../../modules/raise');
    
    const { author } = context.query;
    
    if(!author.includes('@')) {
        raise.Http404(context.res);
    }
    
    try {
        const { data } = await API.getUserProfile(author, [
            'profile',
            'social',
            'heatmap',
            'view',
            'most',
            'recent'
        ]);
        return {
            props: {
                profile: data
            }
        }
    } catch(error) {
        raise.auto(error.response.status, context.res);
    }
}

class Overview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isNightMode: Global.state.isNightMode
        };
        Global.appendUpdater('Overview', () => {
            this.setState({
                isNightMode: Global.state.isNightMode
            });
        });
    }

    render() {
        let heatmap = this.state.isNightMode ? (
            <HeatmapDark data={this.props.profile.heatmap}/>
        ) : (
            <Heatmap data={this.props.profile.heatmap}/>
        );

        return (
            <>
                <Head>
                    <title>{this.props.profile.profile.username} ({this.props.profile.profile.realname})</title>
                </Head>

                <Profile active="overview" profile={this.props.profile.profile} social={this.props.profile.social}/>
                <div className="container mb-4">
                    <div className="col-lg-8 mx-auto p-0">
                        <ViewCounter {...this.props.profile.view}/>
                        <FeatureContent articles={this.props.profile.most}/>
                        {heatmap}
                        <RecentActivity data={this.props.profile.recent}/>
                    </div>
                </div>
            </>
        )
    }
}

export default Overview;