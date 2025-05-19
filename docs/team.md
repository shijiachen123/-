---
layout: page
---
<script setup>
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamMembers,
  VPTeamPageSection
} from 'vitepress/theme'

const coreMembers = [
  {
    avatar: 'https://www.github.com/yyx990803.png',
    name: '张三',
    title: '创始人 & 技术负责人',
    desc: '负责项目的整体架构设计和核心功能开发。在前端工程化和性能优化方面有丰富经验。',
    links: [
      { icon: 'github', link: 'https://github.com/yyx990803' },
      { icon: 'twitter', link: 'https://twitter.com/youyuxi' }
    ],
    sponsor: 'https://github.com/sponsors/yyx990803',
    actionText: '赞助'
  },
  {
    avatar: 'https://www.github.com/kiaking.png',
    name: '李四',
    title: '前端负责人',
    desc: '负责前端界面的设计和实现，专注于用户体验和交互设计。',
    links: [
      { icon: 'github', link: 'https://github.com/kiaking' },
      { icon: 'twitter', link: 'https://twitter.com/KiaKing85' }
    ]
  },
  {
    avatar: 'https://www.github.com/bencodezen.png',
    name: '王五',
    title: '后端负责人',
    desc: '负责服务端架构和数据库设计，擅长高性能、高可用系统的构建。',
    links: [
      { icon: 'github', link: 'https://github.com/bencodezen' },
      { icon: 'twitter', link: 'https://twitter.com/bencodezen' }
    ]
  }
]

const partners = [
  {
    avatar: 'https://www.github.com/NataliaTepluhina.png',
    name: '赵六',
    title: 'DevOps 专家',
    desc: '负责自动化部署和运维工作，确保系统的稳定性和可靠性。',
    links: [
      { icon: 'github', link: 'https://github.com/NataliaTepluhina' },
      { icon: 'twitter', link: 'https://twitter.com/N_Tepluhina' }
    ]
  },
  {
    avatar: 'https://www.github.com/satoterin.png',
    name: '钱七',
    title: '文档工程师',
    desc: '负责项目文档的编写和维护，使用户能够快速上手和使用产品。',
    links: [
      { icon: 'github', link: 'https://github.com/satoterin' }
    ]
  },
  {
    avatar: 'https://www.github.com/fguisso.png',
    name: '孙八',
    title: '安全专家',
    desc: '专注于系统安全和数据保护，确保用户数据的安全和隐私。',
    links: [
      { icon: 'github', link: 'https://github.com/fguisso' },
      { icon: 'twitter', link: 'https://twitter.com/fguisso' }
    ]
  }
]

const contributors = [
  {
    avatar: 'https://www.github.com/ahertz.png',
    name: '周九',
    title: 'UI 设计师',
    links: [
      { icon: 'github', link: 'https://github.com/ahertz' }
    ]
  },
  {
    avatar: 'https://www.github.com/Shinigami92.png',
    name: '吴十',
    title: 'QA 工程师',
    links: [
      { icon: 'github', link: 'https://github.com/Shinigami92' }
    ]
  },
  {
    avatar: 'https://www.github.com/jesseleite.png',
    name: '郑十一',
    title: '产品经理',
    links: [
      { icon: 'github', link: 'https://github.com/jesseleite' }
    ]
  }
]
</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>
      我们的团队
    </template>
    <template #lead>
      四季春项目由一支充满激情的国际团队开发和维护。这些成员贡献了他们的时间和专业知识，以确保项目的持续发展和创新。
    </template>
  </VPTeamPageTitle>
  
  <VPTeamPageSection>
    <template #title>核心团队</template>
    <template #lead>
      核心团队成员负责项目的整体架构、方向规划和关键功能开发。他们全职致力于项目的发展和维护。
    </template>
    <template #members>
      <VPTeamMembers size="medium" :members="coreMembers" />
    </template>
  </VPTeamPageSection>
  
  <VPTeamPageSection>
    <template #title>合作伙伴</template>
    <template #lead>
      合作伙伴在特定领域为项目提供专业支持和技术指导，与核心团队紧密合作，共同推动项目发展。
    </template>
    <template #members>
      <VPTeamMembers size="medium" :members="partners" />
    </template>
  </VPTeamPageSection>
  
  <VPTeamPageSection>
    <template #title>社区贡献者</template>
    <template #lead>
      社区贡献者通过代码贡献、文档改进、问题报告和社区支持等方式帮助项目成长。每一位贡献者都是项目成功的重要部分。
    </template>
    <template #members>
      <VPTeamMembers size="small" :members="contributors" />
    </template>
  </VPTeamPageSection>
</VPTeamPage> 