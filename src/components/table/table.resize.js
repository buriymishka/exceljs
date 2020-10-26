import {$} from '@core/dom';

export function resizeHandler($root, event) {
  return new Promise(resolve => {
    const $resizer = $(event.target)
    const $parent = $resizer.closest('[data-type="resizable"]')
    const coords = $parent.getCoords()
    const type = $resizer.data.resize
    if (type === 'col') {
      $resizer.css({
        'opacity': 1,
        'height': '100vh',
      })
    } else {
      $resizer.css({
        'opacity': 1,
        'width': '100vw',
      })
    }
    let value

    document.onmousemove = e => {
      if (type === 'col') {
        const delta = e.pageX - coords.right
        value = coords.width + delta
        $resizer.css({'right': -delta + 'px'})
      } else {
        const delta = e.pageY - coords.bottom
        value = coords.height + delta
        $resizer.css({'bottom': -delta + 'px'})
      }

    }

    document.onmouseup = () => {
      if (type === 'col') {
        $resizer.css({
          'opacity': 0,
          'height': 'auto',
          'right': 0,
        })
        $parent.css({'width': value + 'px'})
        $root.findAll(`[data-col="${$parent.data.col}"]`)
          .forEach(el => el.style.width = value + 'px')

      } else {
        $parent.css({'height': value + 'px'})
        $resizer.css({
          'bottom': 0,
          'opacity': 0,
          'width': '100%',
        })
      }

      document.onmousemove = null
      document.onmouseup = null

      resolve({
        value,
        type,
        id: $parent.data[type]
      })
    }
  })

}
