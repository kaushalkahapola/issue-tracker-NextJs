import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from "@radix-ui/react-icons";
import { Button, Flex , Text} from "@radix-ui/themes";

interface Props {
  itemCount: number;
  PageSize: number;
  CurrentPage: number;
}

const Pagination = ({ itemCount, PageSize, CurrentPage }: Props) => {
  
  const pageCount = Math.ceil(itemCount / PageSize);
  
  return (
    <Flex align='center' gap='2'>
        <Text size='2'>
            Page {CurrentPage} of { pageCount }
        </Text>
        <Button color="gray" variant="soft" disabled={CurrentPage === 10}>
          <DoubleArrowLeftIcon/>
        </Button>
        <Button color="gray" variant="soft" disabled={CurrentPage === 10}>
          <ChevronLeftIcon/>
        </Button>
        <Button color="gray" variant="soft" disabled={CurrentPage === 10}>
          <ChevronRightIcon/>
        </Button>
        <Button color="gray" variant="soft" disabled={CurrentPage === 10}>
          <DoubleArrowRightIcon/>
        </Button>
    </Flex>
  );
};

export default Pagination;
