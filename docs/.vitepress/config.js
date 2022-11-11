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
            { text: '知识', link: '/category/knowledge/vue/vue_cli' },
            { text: '随笔', link: '/category/jottings/jottings' },
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

            '/category/knowledge/': [
                {
                    text: '知识',
                    items: [
                        // This shows `/category/index.md` page.
                        {
                            text: 'vue',
                            items: [
                                {
                                    text: '基础',
                                    link: '/category/knowledge/vue/vue_base'
                                },
                                {
                                    text: '脚手架',
                                    link: '/category/knowledge/vue/vue_cli'
                                }
                            ]
                        }
                    ]
                }
            ],
            '/category/jottings/': [
                {
                    text: '随笔',
                    items: [
                        {
                            text: 'jottings',
                            link: '/category/jottings/jottings'
                        }
                    ]


                }
            ],
        },
        footer: {
            message: 'Created By Janny'
        },
        // carbonAds: {
        //     code: 'your-carbon-code',
        //     placement: 'your-carbon-placement'
        // },
        // editLink: {
        //     pattern: 'https://github.com/vuejs/vitepress/edit/main/docs/:path',
        //     text: '去github修改这个页面'
        //   },
    },
    markdown: {
        theme: 'material-palenight',
        lineNumbers: true
    }
}