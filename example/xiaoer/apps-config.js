// {
//   name: string // 子应用名称
//   props: object // 注入的props
//   isEmptyLayout: boolean // 是否自定义布局
// }
export default [
  {
    name: 'goods',
    entry: '//localhost:8001',
    activeRule: '/goods',
  },
  {
    name: 'about',
    entry: '//localhost:8002',
    activeRule: '/about',
  },
]