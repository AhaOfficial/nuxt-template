import path from 'path';
import type { NuxtConfig } from '@nuxt/types';

// * 개발 모드인지를 확인합니다.
const isProductionMode = process.env.NODE_ENV == 'production';

// * ExperimentalWarning 오류를 숨깁니다.
process.removeAllListeners('warning');

// * 매 빌드마다 버전이 자동으로 색인됩니다.
const cacheVersion = `_${Math.floor(+new Date() / 1000)}`;

const nuxtConfig:
	| NuxtConfig
	| {
			build: {
				postcss: any;
			};
	  } = {
	srcDir: './client',
	env: {},
	head: {
		title: '아하-컨설팅',
		meta: [
			{ charset: 'utf-8' },
			{
				name: 'viewport',
				content: 'width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=0, viewport-fit=cover'
			},
			{
				hid: 'description',
				name: 'description',
				content: '나중에 추가 합시다.'
			},
			{
				name: 'name',
				content: 'a-ha template'
			},
			{
				name: 'author',
				content: 'a-ha FE'
			},
			{
				name: 'lang',
				content: 'kr'
			}
		],
		link: [{ rel: 'icon', type: 'image/png', size: '16x16', href: '/favicon.png' }]
	},
	build: {
		postcss: {
			plugins: {
				tailwindcss: path.resolve('./client/config/tailwind.config.js')
			}
		}
	},
	loading: { color: '#3B8070' },
	css: ['~/assets/css/main.css'],
	buildModules: ['@nuxt/typescript-build', '@nuxtjs/tailwindcss', '@nuxtjs/pwa'],
	modules: ['@nuxtjs/axios'],
	axios: {},
	plugins: ['~/plugins/composition-api'],
	tailwindcss: {
		configPath: '~/config/tailwind.config.js',
		cssPath: '~/assets/css/tailwind.css',
		exposeConfig: false
	},
	pwa: {
		// ? Workbox 공식 설명
		// ? https://pwa.nuxtjs.org/modules/workbox.html#options

		// ? PWA-Module 원본파일 참조
		// ? https://github.com/nuxt-community/pwa-module/blob/dev/lib/workbox/defaults.js

		workbox: {
			// * 브라우저 상에서 페이지가 활성화 되있는 중에
			// * 캐싱할 리소스들의 조건들을 여기에서 정의할 수 있습니다.
			runtimeCaching: [
				// urlPattern 은 아래와 같이 주소 형식 또는 확장자도 가능합니다.
				// urlPattern: 'https://my-cdn.com/.*', // 반드시 .* 이 뒤에 붙어야 하위 경로를 모두 캐싱합니다.
				// urlPattern: /\.(?:png|jpg|jpeg|svg)$/,

				// handler 유형 목록입니다.
				// Cache First   : 네트워크 요청과 캐싱 중 항상 캐시를 먼저 접근하는 방식
				// Cache Only    : 캐싱 파일만 확인하고 없으면 에러를 뱉는 방식
				// Network First : 항상 캐싱보다는 네트워크 요청을 먼저 진행하는 방식 (캐싱도 확인, 늦어지면 캐시표시)
				// Network Only  : 해당 파일에 대해서는 캐싱 파일의 유무와 관계 없이 항상 네트워크 요청만 하는 방식
				// StaleWhileRevalidate :
				//    캐싱을 먼저 시도하고 없으면 네트워크 요청을 진행하는 방식.
				//    프로필 이미지와 같이 자주 업데이트 되면서 최신 데이터가 아니어도 되는 데이터 적용하면 좋음

				// * 글로벌 캐싱 정책
				{
					urlPattern: '.*',
					handler: 'StaleWhileRevalidate',
					strategyOptions: {
						cacheName: `global${cacheVersion}`,
						cacheExpiration: {
							// maxEntries: 500, // * 500 개 까지만 구성합니다.
							maxAgeSeconds: 12 * (60 * 60) // * 12시간 동안 유효합니다.
						}
					}
				}
			]
		},
		meta: {
			charset: 'utf-8',
			viewport: 'width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=0, viewport-fit=cover',
			mobileApp: true,
			mobileAppIOS: false,
			favicon: '/favicon.png',
			name: 'a-ha template',
			author: 'a-ha FE',
			description: '나중에 추가 합시다.',
			lang: 'kr'
		}
	}
};

// * 런타임 캐싱을 개발 모드에선 사용하지 않습니다.
// * HMR 사용 시 캐싱을 막기위한 조치입니다.
if (!isProductionMode) {
	const config = nuxtConfig as NuxtConfig;
	if (config && config.pwa && config.pwa.runtimeCaching) delete config.pwa.runtimeCaching;
}

export default nuxtConfig;
