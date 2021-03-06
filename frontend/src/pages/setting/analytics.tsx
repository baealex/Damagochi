import React, { useState } from 'react';
import ReactFrappeChart from 'react-frappe-charts';

// import { toast } from 'react-toastify';

import SettingLayout from '@components/setting/layout';

import * as API from '@modules/api';

import { GetServerSidePropsContext } from 'next';

interface Props extends API.SettingViewData, API.SettingRefererData {}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const { req, res } = context;
    if(!req.headers.cookie) {
        res.writeHead(302, { Location: '/' });
        res.end();
    }
    const views = await API.getSetting(req.headers.cookie, 'view');
    if(views.data === API.ERROR.NOT_LOGIN) {
        res.writeHead(302, { Location: '/' });
        res.end();
    }
    const referers = await API.getSettingReferrers(req.headers.cookie, 1);
    return {
        props: {...views.data, ...referers.data}
    };
}

export default function Setting(props: Props) {
    const [ referers, setReferers ] = useState(props.referers);
    const [ page, setPage ] = useState(2);
    const lastPage = props.lastPage < 10 ? props.lastPage : 10;

    const getReferer = async () => {
        if(page < lastPage) {
            const { data } = await API.getSettingReferrers(undefined, page);
            setReferers(referers.concat(data.referers))
            setPage(page + 1);   
        }
    };

    return (
        <>
            <SettingLayout tabname="analytics">
                <div className="blex-card p-3">
                    <ReactFrappeChart
                        type="axis-mixed"
                        data={{
                            labels: props.views.map(item => item.date).reverse(),
                            datasets: [
                                {
                                    name: 'View',
                                    values: props.views.map(item => item.count).reverse(),
                                    chartType: 'line'
                                }
                            ]
                        }}
                        colors={['purple']}
                    />
                </div>
                <div className="blex-card p-3 my-3">
                    <ul>
                        {referers.map((item: any, idx: number) => (
                            <li key={idx}>{item.time} - <a className="shallow-dark" href={item.url} target="blank">{item.title ? item.title : item.url}</a></li>
                        ))}
                    </ul>
                </div>
                <div className={`blex-card p-3 my-3 text-center ${lastPage - page != 0 ? 'deep-dark c-pointer' : 'shallow-dark'}`} onClick={async () => getReferer()}>
                    {`더 보기 (${lastPage - page})`}
                </div>
            </SettingLayout>
        </>
    );
}