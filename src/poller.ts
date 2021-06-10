const poller = (fn = () => {}, interval = Infinity) => {
  fn()
  setInterval(() => {
    fn()
  }, interval)
}

export default poller;