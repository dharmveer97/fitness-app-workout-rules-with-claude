import { Text } from './Themed'

export function MonoText(props: ThemedTextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'SpaceMono' }]} />
}
