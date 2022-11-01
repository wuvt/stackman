import { useEffect, useRef, useState } from 'preact/hooks';

import useSpring from '../hooks/useSpring';
import classnames from '../utils/classnames';

import styles from './Select.module.css';

type SelectItem = {
  key: string;
  value: string;
}

type SelectProps = {
  name: string;
  items: SelectItem[];
  label: string;
  onChange?: (key: string) => void;
}

const Select = ({ name, items, label, onChange }: SelectProps) => {
  const [ expanded, setExpanded ] = useState(false);
  const [ selected, setSelected ] = useState(items[0].key);
  const [ active, setActive ] = useState(items[0].key);
  const [ query, setQuery ] = useState('');

  const arrowRef = useRef<SVGSVGElement>(null);
  const timeoutRef = useRef<number | null>(null);

  let ignoreBlur = false;

  useSpring(expanded, 0.4, 300, 22, s => {
    if (arrowRef.current) {
      arrowRef.current.style.transform = `rotate(${s.currentValue * -180}deg)`;
    }
  });

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    }
  }, [])

  const onComboBlur = () => {
    if (ignoreBlur) {
      ignoreBlur = false;
      return;
    }

    if (expanded) {
      selectOption(active);
      setExpanded(false);
    }
  }

  const onComboKeyDown = (e: KeyboardEvent) => {
    const { key, altKey, ctrlKey, metaKey } = e;
    const orderedItems = [
      ...items.filter(item => item.key === selected),
      ...items.filter(item => item.key !== selected),
    ].map(item => item.key);

    if (expanded) {
      if (key === 'ArrowUp' && altKey || key === 'Enter' || key === ' ') {
        e.preventDefault();
        selectOption(active);
        setExpanded(false);
      } else if (key === 'ArrowDown' && !altKey) {
        e.preventDefault();
        const index = Math.min(
          orderedItems.indexOf(active) + 1,
          items.length - 1,
        );
        setActive(orderedItems[index]);
      } else if (key === 'ArrowUp') {
        e.preventDefault();
        const index = Math.max(orderedItems.indexOf(active) - 1, 0);
        setActive(orderedItems[index]);
      } else if (key === 'PageUp' || key === 'Home') {
        e.preventDefault();
        setActive(orderedItems[0]);
      } else if (key === 'PageDown' || key === 'End') {
        e.preventDefault();
        setActive(orderedItems[items.length - 1]);
      } else if (key === 'Escape') {
        e.preventDefault();
        setExpanded(false);
      }
    } else {
      if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(key)) {
        e.preventDefault();
        setExpanded(true);
      } else if (key === 'Home') {
        e.preventDefault();
        setActive(orderedItems[0]);
        setExpanded(true);
      } else if (key === 'End') {
        e.preventDefault();
        setActive(orderedItems[items.length - 1]);
        setExpanded(true);
      }
    }

    if (
      key === 'Backspace' ||
      key === 'Clear' ||
      (key.length === 1 && key !== ' ' && !altKey && !ctrlKey && !metaKey)
    ) {
      e.preventDefault();
      setExpanded(true);

      const newQuery = query + key;
      const match = items.filter(item => {
        return item.value.toLowerCase().indexOf(newQuery.toLowerCase()) === 0;
      })[0];

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (match) {
        setActive(match.key);
        setQuery(query + key);
        timeoutRef.current = setTimeout(() => setQuery(''), 500);
      } else {
        setQuery('');
      }
    }
  }

  const selectOption = (key: string) => {
    setSelected(key);
    if (onChange) {
      onChange(key);
    }
  }

  return (
    <div
      class={classnames(styles.selectContainer, { [styles.open]: expanded })}
    >
      <button
        aria-activedescendant={`${name}-listbox-${active}`}
        aria-controls={`${name}-listbox`}
        aria-expanded={expanded}
        aria-haspopup="listbox"
        aria-label={label}
        id={name}
        class={classnames(styles.selectTarget, {
          [styles.selectTargetUnfocus]: active !== selected,
        })}
        role="combobox"
        tab-index="0"
        onClick={() => setExpanded(!expanded)}
        onBlur={onComboBlur}
        onKeyDown={onComboKeyDown}
      >
        {items.filter(item => item.key == selected).map(item => item.value)[0]}
        <svg
          aria-hidden
          ref={arrowRef}
          class={classnames(styles.targetIcon, {
            [styles.targetIconActive]: expanded,
          })}
          viewBox="0 0 24 24"
        >
          <path d="m12 15-5-5h10Z" />
        </svg>
      </button>
      <ul
        aria-label={label}
        id={`${name}-listbox`}
        class={styles.selectList}
        role="listbox"
        tab-index="-1"
      >
        {items
          .filter(item => item.key !== selected)
          .map(item => (
            <li
              aria-selected={item.key == selected}
              class={classnames(styles.selectItem, {
                [styles.selectItemActive]: item.key == active,
              })}
              id={`${name}-listbox-${item.key}`}
              key={item.key}
              role="option"
              onClick={e => {
                e.stopPropagation();
                setActive(item.key);
                selectOption(item.key);
                setExpanded(false);
              }}
              onMouseDown={() => ignoreBlur = true}
            >
              {item.value}
            </li>
          ))
        }
      </ul>
    </div>
  );
}

export default Select;
