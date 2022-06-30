const cardVariants = {
  defaults: {
    padding: {
      phone: 'm',
      tablet: 's',
    },
    margin: {
      phone: 's',
      tablet: 'm',
    },
  },
  elevated: {
    borderRadius: 'm',
    shadowColor: 'text',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    borderColor: 'white',
    backgroundColor: 'white',
    elevation: 5,
  },
  product: {
    borderRadius: 'm',
    shadowColor: 'text',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    backgroundColor: 'white',
    elevation: 5,
  },
}
export default cardVariants
