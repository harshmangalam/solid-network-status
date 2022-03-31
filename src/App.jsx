import {
  Box,
  CircularProgress,
  CircularProgressIndicator,
  CircularProgressLabel,
  Container,
  GridItem,
  Heading,
  HopeProvider,
  HStack,
  SimpleGrid,
  Tag,
  Text,
  VStack,
} from "@hope-ui/solid";
import ThemeSwitcher from "./components/ThemeSwitcher";
import useNetwork from "./hooks/useNetwork";

function App() {
  const { network } = useNetwork();
  return (
    <HopeProvider config={{ initialColorMode: "dark" }}>
      <Box minH={"100vh"} h="$full" w={"$full"} py="$10">
        <VStack spacing={"$3"}>
          <Heading textAlign={"center"} fontSize={"$6xl"}>
            Network &nbsp;
            <Box as="span" color={"$primary10"}>
              Status
            </Box>
          </Heading>

          <HStack spacing={"$2"}>
            <Tag
              colorScheme={network.isOnline ? "success" : "danger"}
              size={"lg"}
              variant="dot"
              dotPlacement="start"
            >
              <Show when={network.isOnline} fallback="Offline">
                Online
              </Show>
            </Tag>

            <ThemeSwitcher />
          </HStack>
        </VStack>
        <Container mt={"$10"}>
          <SimpleGrid
            w={"$full"}
            columns={{ "@initial": 1, "@sm": 2, "@md": 2, "@xl": 4 }}
            justifyContent="center"
          >
            <GridItem mx={"auto"}>
              <CircularProgress thickness={"$0_5"} size={"$xs"} value={100}>
                <CircularProgressIndicator color={"$warning10"} />
                <CircularProgressLabel>
                  <VStack spacing={"$6"}>
                    <Heading fontSize={"$xl"}> Effective Type</Heading>
                    <Text fontSize={"$xl"}>
                      {network.connection?.effectiveType}
                    </Text>
                  </VStack>
                </CircularProgressLabel>
              </CircularProgress>
            </GridItem>
            <GridItem mx={"auto"}>
              <CircularProgress size={"$xs"} value={100} thickness={"$0_5"}>
                <CircularProgressIndicator color={"$success10"} />
                <CircularProgressLabel>
                  <VStack spacing={"$6"}>
                    <Heading fontSize={"$xl"}> Downlink</Heading>
                    <Text fontSize={"$xl"}>{network.connection.downlink} </Text>
                  </VStack>
                </CircularProgressLabel>
              </CircularProgress>
            </GridItem>

            <GridItem mx={"auto"}>
              <CircularProgress thickness={"$0_5"} size={"$xs"} value={100}>
                <CircularProgressIndicator color={"$primary10"} />
                <CircularProgressLabel>
                  <VStack spacing={"$6"}>
                    <Heading fontSize={"$xl"}> Rtt</Heading>
                    <Text fontSize={"$xl"}>{network.connection.rtt}</Text>
                  </VStack>
                </CircularProgressLabel>
              </CircularProgress>
            </GridItem>
            <GridItem mx={"auto"}>
              <CircularProgress thickness={"$0_5"} size={"$xs"} value={100}>
                <CircularProgressIndicator color={"$whiteAlpha10"} />
                <CircularProgressLabel>
                  <VStack spacing={"$6"}>
                    <Heading fontSize={"$xl"}> Type</Heading>
                    <Text fontSize={"$xl"}>{network.connection?.type}</Text>
                  </VStack>
                </CircularProgressLabel>
              </CircularProgress>
            </GridItem>
          </SimpleGrid>
        </Container>
      </Box>
    </HopeProvider>
  );
}

export default App;
