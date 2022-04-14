const slug = (str) => {
	 str = str.toLowerCase()
      str = str.replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      return str
}

export default({app}, inject) => {
	inject('slug', slug)
}