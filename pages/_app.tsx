import 'antd/dist/antd.variable.min.css';
import '../styles/globals.css';

import { ConfigProvider, Layout } from 'antd';
import Image from 'next/image';
import React from 'react';

import HeaderMenu from '../components/layout/header_menu';
import SiderMenu from '../components/layout/sider_menu';
import MyBreadcrum from '../components/reusable/breadcrumb';
import Logo from '../public/images/logo_color.png';
import { primaryColor } from '../utils/constant';

import type { AppProps } from 'next/app'
import Link from 'next/link';
const { Content, Footer, Sider } = Layout;

function MyApp({ Component, pageProps }: AppProps) {

	ConfigProvider.config({
		theme: {
			primaryColor: primaryColor,
		},
	});

	return <ConfigProvider>
		<Layout className='min-h-screen'>
			<Sider
				theme='light'
				breakpoint="lg"
				collapsedWidth="0"
				onBreakpoint={broken => {
					console.log(broken);
				}}
				onCollapse={(collapsed, type) => {
					console.log(collapsed, type);
				}}
			>
				<div className="relative h-16 flex justify-center items-center" >
					<Link href={"/"}>
						<a><Image alt='Failed load image...' src={Logo} height={100} width={100} /></a>
					</Link>
				</div>
				<SiderMenu />
			</Sider>
			<Layout>
				<HeaderMenu />
				<Content className='py-12 p-2 md:p-5'>
					<MyBreadcrum />
					<Component {...pageProps} />
				</Content>
				<Footer className='text-center text-white bg-primary'>Ant Design ©2018 Created by Ant UED</Footer>
			</Layout>
		</Layout>
	</ConfigProvider>

}


export default MyApp
