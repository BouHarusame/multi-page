export default {
  name: 'Render',
  functional: true,
  props: {
    render: Function,
    data: Object,
    userRoles: Array
  },
  render: (h, ctx) => {
    const params = {
      userRoles: ctx.props.userRoles,
      ...ctx.props.data
    }
    return ctx.props.render(h, params)
  }
}
