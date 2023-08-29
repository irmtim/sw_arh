import { APP_URL, PageLink, PageTitle } from "shared";

type Props = {

}

const breadcrumbs: PageLink[] = [
  {
    icon: 'home',
    path: APP_URL.INDEX,
    isSeparator: false,
    isActive: false,
  },
  {
    title: '',
    path: '',
    isSeparator: true,
    isActive: false,
  },
  {
    title: 'Коммутаторы',
    path: APP_URL.SWITCHES_INDEX,
    isSeparator: false,
    isActive: false,
  },
]

const SwitchViewPage = ({}: Props) => {
  return (
    <>
      <PageTitle breadcrumbs={breadcrumbs}>Коммутатор</PageTitle>
    </>
  );
};

export default SwitchViewPage