import{_ as s,c as a,o as n,a as l}from"./app.9a0d715d.js";const u=JSON.parse('{"title":"\u4EFF\u4EAC\u4E1C\u9879\u76EEC\u7AEF(taro)","description":"","frontmatter":{},"headers":[{"level":2,"title":"tabBar\u6A21\u5757","slug":"tabbar\u6A21\u5757","link":"#tabbar\u6A21\u5757","children":[{"level":3,"title":"\u6CE8\u610F\u70B9","slug":"\u6CE8\u610F\u70B9","link":"#\u6CE8\u610F\u70B9","children":[]},{"level":3,"title":"\u5177\u4F53\u4EE3\u7801","slug":"\u5177\u4F53\u4EE3\u7801","link":"#\u5177\u4F53\u4EE3\u7801","children":[]}]}],"relativePath":"category/jottings/jd.md"}'),p={name:"category/jottings/jd.md"},e=l(`<h1 id="\u4EFF\u4EAC\u4E1C\u9879\u76EEc\u7AEF-taro" tabindex="-1">\u4EFF\u4EAC\u4E1C\u9879\u76EEC\u7AEF(taro) <a class="header-anchor" href="#\u4EFF\u4EAC\u4E1C\u9879\u76EEc\u7AEF-taro" aria-hidden="true">#</a></h1><h2 id="tabbar\u6A21\u5757" tabindex="-1">tabBar\u6A21\u5757 <a class="header-anchor" href="#tabbar\u6A21\u5757" aria-hidden="true">#</a></h2><h3 id="\u6CE8\u610F\u70B9" tabindex="-1">\u6CE8\u610F\u70B9 <a class="header-anchor" href="#\u6CE8\u610F\u70B9" aria-hidden="true">#</a></h3><ol><li>\u56FE\u6807\u8981\u653E\u5728 src \u76EE\u5F55\u4E0B\u7684 public \u6587\u4EF6\u5939\u4E2D\uFF0C\u7528 public/xxx.png \u83B7\u53D6</li><li>\u5728\u547D\u4EE4\u884C\u4F7F\u7528 taro create --name home \u53EF\u4EE5\u81EA\u52A8\u521B\u5EFA\u4E00\u4E2A\u540D\u4E3A home \u7684\u9875\u9762</li></ol><h3 id="\u5177\u4F53\u4EE3\u7801" tabindex="-1">\u5177\u4F53\u4EE3\u7801 <a class="header-anchor" href="#\u5177\u4F53\u4EE3\u7801" aria-hidden="true">#</a></h3><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki"><code><span class="line"><span style="color:#676E95;">// src/app.config.ts</span></span>
<span class="line"><span style="color:#FFCB6B;">tabBar</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#FFCB6B;">selectedColor</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">#6495ED</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#FFCB6B;">list</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;">[</span></span>
<span class="line"><span style="color:#F07178;">            </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">                text</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">\u9996\u9875</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">                pagePath</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">pages/home/index</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">                iconPath</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">public/tabbar/home.png</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">                selectedIconPath</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">public/tabbar/home-active.png</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#F07178;">            </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#F07178;">            </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">                text</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">\u65B0\u54C1</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">                pagePath</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">pages/new/index</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">                iconPath</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">public/tabbar/new.png</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">                selectedIconPath</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">public/tabbar/new-active.png</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#F07178;">            </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#F07178;">            </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">                text</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">\u8D2D\u7269\u8F66</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">                pagePath</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">pages/cart/index</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">                iconPath</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">public/tabbar/cart.png</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">                selectedIconPath</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">public/tabbar/cart-active.png</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#F07178;">            </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#F07178;">            </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">                text</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">\u6211\u7684</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">                pagePath</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">pages/my/index</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">                iconPath</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">public/tabbar/my.png</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">                selectedIconPath</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">public/tabbar/my-active.png</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#F07178;">            </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">    ]</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br></div></div><p><a href="https://www.yuque.com/lexmin/rlww9b" target="_blank" rel="noreferrer">\u8BED\u96C0\u77E5\u8BC6\u5E93\u94FE\u63A5</a></p>`,7),o=[e];function r(c,t,F,D,y,i){return n(),a("div",null,o)}const d=s(p,[["render",r]]);export{u as __pageData,d as default};
