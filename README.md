# Freecodecamp Dynamic Web Application Project: Chart the Stock Market (Front-End)

### Notes:

- Use `componentWillReceiveProps` function if parent component
will update props.

- Use `componentDidUpdate(prevProps, prevState)` for post re-render processes.
One example might be inspecting with `console.log(this.state)`. Since state doesn't
update immediately with `this.setState()`, to see changes fully, you have to ensure
that component is updated.
