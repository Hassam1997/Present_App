/** @format */

type StackNavigationProp =
  import("@react-navigation/stack").StackNavigationProp<
    allAnyTypes,
    allAnyTypes
  >
type RouteProp = import("@react-navigation/core").RouteProp<
  allAnyTypes,
  allAnyTypes
>
type ReactNode = import("react").ReactNode
type ReactChild = import("react").ReactChild
type ReactChildren = import("react").ReactChildren
type ViewStyle = import("react-native").ViewStyle
type StyleSheetProps = import("react-native").StyleSheet
type Component = import("react").Component
type ElementType = import("react").ElementType
type TReduxState = import("store/index").ReduxState
type isTypeNumber = number
type isTypeString = string
type isTypeNull = null
type isTypeBoolen = boolean
type isTypeFunction = (value: any) => void
type isTypeFunctionStringParam = (value: isTypeString) => void
type isTypeFunctionNumberParams = (value: isTypeNumber) => void

type allAnyTypes =
  | isTypeObject
  | isTypeFunction
  | isTypeUndefined
  | isTypeString
  | isTypeNumber
  | isTypeArray
  | isTypeNull

type isTypeObject = Record<
  string,
  isTypeNumber,
  isTypeString,
  isTypeFunction,
  isTypeUndefined,
  isTypeBoolen
>

type isTypeUndefined = undefined

type isTypeArrayOfObjects = Array<string, isTypeObject>

type TReduxState = import("store/index").ReduxState

type CallbackFunction = (data: any) => void

interface UrlInfo {
  type: string
  access_token_required?: boolean
  route: string
  meta_data?: boolean
  image_upload?: string
}

interface IAction {
  type: string
  payload?: allAnyTypes
}
interface IsNavigtionProps {
  route: {
    params: any
  }
  navigation: StackNavigationProp
}
interface IsRouteRequiredProps {
  route: {
    params: any
  }
  navigation: any
}
interface IsNavigationRequiredProps extends IsRouteRequiredProps {
  navigation: any
}

interface ProductCardProps {
  item: {
    image: any
    productDescription: string
    wishList: boolean
    price: number
    brandIcon: any
    priceType: string
    priceTypeImage: any
  }
  index?: number
  customStyle: {
    height: number
    marginLeft: number
  }
}

interface RenderItemProps {
  item: isTypeObject
  index?: number
}

interface CalendarStyleProps extends StyleSheetProps {
  container: any
  theme: any
}

interface CalendarProps {
  initialDate: string
  onPress?: (identifier: any) => void
  selectedDates?: Array<any>
}
