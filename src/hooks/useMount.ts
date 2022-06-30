import React from 'react'

const useMount = (
  func: () => Function | void | Promise<void> | Promise<Function>,
) =>
  React.useEffect(() => {
    const unsub = func()
    return () => {
      if (typeof unsub === 'function') {
        unsub()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

export default useMount
