export default {
    title: "Janny's Blog",
    titleTemplate: false,
    description: '张妮妮的博客',
    lang: 'zh',

    themeConfig: {
        siteTitle: "Janny's Blog",
        logo: {
            src: '/logo.jpg',
            alt: 'logo'
        },
        nav: [
            { text: '首页', link: '/' },
            { text: '分类', link: '/category/knowledge' },
        ],
        socialLinks: [
            { icon: 'github', link: 'https://github.com/JannyZ925' },
        ],
        sidebar: {
            // '/': [
            //     {
            //         text: 'Index',
            //         items: [
            //             { text: 'category', link: '/category/' }, 
            //             { text: 'Config', link: '/config/' }, 
            //         ]
            //     }
            // ],

            '/category/': [
                {
                    text: '分类',
                    items: [
                        // This shows `/category/index.md` page.
                        { text: '知识', link: '/category/knowledge' }, 
                        { text: '随笔', link: '/category/jottings' }
                    ]
                }
            ],
        },
        markdown: {
            theme: 'material-palenight',
            lineNumbers: true
        },
        // carbonAds: {
        //     code: 'your-carbon-code',
        //     placement: 'your-carbon-placement'
        // },
        // editLink: {
        //     pattern: 'https://github.com/vuejs/vitepress/edit/main/docs/:path',
        //     text: '去github修改这个页面'
        //   },
        footer: {
            message: 'Created By Janny'
        }

    }
}