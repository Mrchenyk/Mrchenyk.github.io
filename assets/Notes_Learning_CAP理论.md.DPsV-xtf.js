import{_ as e,n as t,a2 as r,m as i}from"./chunks/framework.DLL39-MI.js";const h=JSON.parse('{"title":"CAP理论","description":"","frontmatter":{},"headers":[],"relativePath":"Notes/Learning/CAP理论.md","filePath":"Notes/Learning/CAP理论.md","lastUpdated":1737554725000}'),o={name:"Notes/Learning/CAP理论.md"};function n(l,a,s,p,c,u){return i(),t("div",null,a[0]||(a[0]=[r('<h1 id="cap理论" tabindex="-1">CAP理论 <a class="header-anchor" href="#cap理论" aria-label="Permalink to &quot;CAP理论&quot;">​</a></h1><h2 id="定义" tabindex="-1">定义 <a class="header-anchor" href="#定义" aria-label="Permalink to &quot;定义&quot;">​</a></h2><p>CAP理论：一个分布式系统最多只能同时满足一致性（Consistency）、可用性（Availability）和分区容错性（Partition tolerance）这三项中的两项。</p><ul><li>一致性（<strong>C</strong>onsistency） ：等同于所有节点访问<strong>同一份最新</strong>的数据副本；</li><li><a href="https://zh.wikipedia.org/wiki/%E5%8F%AF%E7%94%A8%E6%80%A7" target="_blank" rel="noreferrer">可用性</a>（<strong>A</strong>vailability）：每次请求都能获取到非错的响应——但是不保证获取的数据为最新数据；</li><li><a href="https://zh.wikipedia.org/w/index.php?title=%E7%BD%91%E7%BB%9C%E5%88%86%E5%8C%BA&amp;action=edit&amp;redlink=1" target="_blank" rel="noreferrer">分区容错性</a>（<strong>P</strong>artition tolerance）：以实际效果而言，分区相当于对通信的时限要求。系统如果不能在时限内达成数据一致性，就意味着发生了分区的情况，必须就当前操作在C和A之间做出选择；（简单解释：分区容错性是尽管任意数量的消息被节点间的网络<strong>丢失或者延迟</strong>，系统仍然是正确运行的！）</li></ul><h2 id="为什么只能三选二" tabindex="-1">为什么只能三选二 <a class="header-anchor" href="#为什么只能三选二" aria-label="Permalink to &quot;为什么只能三选二&quot;">​</a></h2><p>当没有网络分区或网络波动是，无需为了P而舍弃C和A中的一个。但是在分布式系统中不可能没有网络波动，所以为了保证P，也就是让整个分布式系统可用，就要舍弃C和A中的一个。</p><p>例如：存在三个副本，则对于这三个副本的写入有两种可能的方案：</p><ul><li><p>W=1（一写）：向三个副本写入，只要一个副本返回写入成功即认为成功；</p><p>由于只要有一个副本写入成功即可返回成功；当存在网络分区后（如上图S1的网络和其他节点中断），三台机器的数据就可能出现不一致的情况，因此无法保证C；但是由于可以正常的返回写入成功，所以A可以保证！</p></li><li><p>W=3（三写）：向三个副本写入，必须三个副本都写入成功才认为成功；</p><p>此方案要求三个副本都要写入成功才可以返回成功；</p><p>当出现网络分区后，由于无法保证三个节点都写入成功，因此最终会返回错误；</p><p>所以此时失去了A，但是由于数据没有被成功写入，因此保证了C！</p></li></ul><h2 id="cap理论在分布式数据库下的场景" tabindex="-1"><strong>CAP理论在分布式数据库下的场景</strong> <a class="header-anchor" href="#cap理论在分布式数据库下的场景" aria-label="Permalink to &quot;**CAP理论在分布式数据库下的场景**&quot;">​</a></h2><p>对于NoSQL数据库，更加注重可用性，所以会是一个AP系统。</p><p>对于分布式关系型数据库，必须要保证一致性，所以会是一个CP系统。</p><p>我们可以将关系型数据库看作是 CP + HA（Hign Availability） 的系统，因此产生了两个重要且广泛使用的指标：</p><ul><li><strong>RPO（Recovery Point Objective，恢复点目标）</strong>：指数据库在灾难发生后会丢失多长时间的数据，对于分布式数据库基本上 RPO=0；</li><li><strong>RTO（Recovery Time Objective，恢复点时间）</strong>：指数据库在灾难发生后到整个系统恢复正常所需要的时间，对于分布式数据库通常情况下 RTO&lt;几分钟；</li></ul><h2 id="cap理论下目前成熟的分布式方案" tabindex="-1"><strong>CAP理论下目前成熟的分布式方案</strong> <a class="header-anchor" href="#cap理论下目前成熟的分布式方案" aria-label="Permalink to &quot;**CAP理论下目前成熟的分布式方案**&quot;">​</a></h2><h3 id="quorum-replication" tabindex="-1"><strong>Quorum Replication</strong> <a class="header-anchor" href="#quorum-replication" aria-label="Permalink to &quot;**Quorum Replication**&quot;">​</a></h3><p>Quorum Replication 主要包括三个部分：</p><ul><li>N：副本数；</li><li>W：写入成功副本数；</li><li>R：读取成功副本数；</li></ul><p>当 N=3 时有两种设计：</p><ul><li><strong>W=1，R=3：写可用AP，读一致CP，如：记录流水系统，需要快速写入但是可以暂时无法读取，并且不可以读到老旧的错误流水；</strong></li><li><strong>W=3，R=1：写一致CP，读可用AP，如：电子商务系统，商家修改商品金额，可以容许暂时失败，但是会有大量客户去查看商品，需要保证读可用；</strong></li></ul><h3 id="consensus" tabindex="-1"><strong>Consensus</strong> <a class="header-anchor" href="#consensus" aria-label="Permalink to &quot;**Consensus**&quot;">​</a></h3><p>在共识算法中，各个副本之间存在交互；</p><p>通常情况下，整个集群中会选举出一个 leader（例如：raft、paxos算法），所有操作由leader提供（读写操作）；</p><ul><li><strong>当 leader 没有出现故障的情况下，整个集群的 CA 都可以得到保障！</strong></li><li><strong>当 leader 由于部分原因宕机，集群选举新的 leader，而此时系统在选举的短暂过程中不可用；</strong></li></ul><p><strong>因此，共识算法通常都是一个 CP + HA 的系统；</strong></p>',24)]))}const g=e(o,[["render",n]]);export{h as __pageData,g as default};
