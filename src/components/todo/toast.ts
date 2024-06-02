export default function TodoToast(props: any) {
  props.toast({
    variant: props.variant,
    description: props.description,
  });
}
