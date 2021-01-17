import React, { useCallback, useEffect, useState } from "react";

import numeral from "numeral";
import { Card, CardContent, Spacer, CardTitle, Surface, Separator } from "react-neu";

import { AssetEntry, StyledAssetContentInner } from "./Asset";

import SeparatorGrid from "./SeparatorWithCSS";
import Box from "./BoxWithDisplay";
import styled from "styled-components";
import useYam from "hooks/useYam";

import {
  getCurrentPrice,
  getDPIPrice,
  getYam,
  getWETH,
  getDPI,
  getUMA,
  getINDEXCOOP,
  getYUSD,
  getWETHPrice,
  getYUSDPrice,
  getYamPrice,
  getUMAPrice,
  getINDEXCOOPPrice,
  getIndexCoopLP,
} from "yam-sdk/utils";
import Split from "components/Split";
import useTreasury from "hooks/useTreasury";
import { useWallet } from "use-wallet";

const AssetsList: React.FC = () => {
  const yam = useYam();
  const {
    totalYUsdValue,
    totalDPIValue,
    totalWETHValue,
    totalIndexLPValue,
    totalIndexCoop,
    totalSushi,
    totalUMAValue,
    totalBalanceIndexCoop,
  } = useTreasury();
  const [currentPrice, setCurrentPrice] = useState<string>();
  const [scalingFactor, setScalingFactor] = useState<string>();
  const [maxSupply, setMaxSupply] = useState<string>();
  const [marketCap, setMarketCap] = useState<string>();
  const [yusdPrice, setYUSDPrice] = useState<number>();
  const [dpiPrice, setDPIPrice] = useState<number>();
  const [wethPrice, setWETHPrice] = useState<number>();
  const [umaPrice, setUMAPrice] = useState<number>();
  const [indexCoopPrice, setIndexCoopPrice] = useState<number>();
  const [change24, setChange24] = useState<string>();
  const [change24WETH, setChange24WETH] = useState<string>();
  const [change24DPI, setChange24DPI] = useState<string>();
  const [change24UMA, setChange24UMA] = useState<string>();
  const [change24YUSD, setChange24YUSD] = useState<string>();
  const [change24IndexCoop, setChange24IndexCoop] = useState<string>();
  const { status } = useWallet();

  const fetchOnce = useCallback(async () => {
    const yamValues = await getYam();
    const wethValues = await getWETH();
    const dpiValues = await getDPI();
    const umaValues = await getUMA();
    const yusdValues = await getYUSD();
    const indexCoopValues = await getINDEXCOOP();

    const yusdPrice = await getYUSDPrice();
    const dpiPrice = await getDPIPrice();
    const wethPrice = await getWETHPrice();
    const umaPrice = await getUMAPrice();
    const indexCoopPrice = await getINDEXCOOPPrice();
    setMaxSupply(numeral(yamValues.market_data.max_supply).format("0.00a"));
    setMarketCap(numeral(yamValues.market_data.market_cap.usd).format("0.00a"));
    setChange24(numeral(yamValues.market_data.price_change_percentage_24h_in_currency.usd).format("0.00a") + "%");
    setChange24WETH(numeral(wethValues.market_data.price_change_percentage_24h_in_currency.usd).format("0.00a") + "%");
    setChange24DPI(numeral(dpiValues.market_data.price_change_percentage_24h_in_currency.usd).format("0.00a") + "%");
    setChange24UMA(numeral(umaValues.market_data.price_change_percentage_24h_in_currency.usd).format("0.00a") + "%");
    setChange24YUSD(numeral(yusdValues.market_data.price_change_percentage_24h_in_currency.usd).format("0.00a") + "%");
    setChange24IndexCoop(numeral(indexCoopValues.market_data.price_change_percentage_24h_in_currency.usd).format("0.00a") + "%");
    setYUSDPrice(yusdPrice);
    setDPIPrice(dpiPrice);
    setWETHPrice(wethPrice);
    setUMAPrice(umaPrice);
    setIndexCoopPrice(indexCoopPrice);
  }, [setMaxSupply, setMarketCap, setYUSDPrice, setDPIPrice, setChange24]);

  useEffect(() => {
    if (status === "connected") {
      fetchOnce();
    }
  }, [status]);

  const fetchStats = useCallback(async () => {
    if (status === "connected") {
      if (!yam) return;
      // const price = await getCurrentPrice(yam);
      // setCurrentPrice(numeral(bnToDec(price)).format("0.00a"));
      const price = await getYamPrice();
      setCurrentPrice(numeral(price).format("0.00a"));
    }
  }, [yam, setCurrentPrice, setScalingFactor]);

  useEffect(() => {
    fetchStats();
    let refreshInterval = setInterval(fetchStats, 10000);
    return () => clearInterval(refreshInterval);
  }, [fetchStats, yam]);

  const assetYUSD = (totalYUsdValue || 0) * (yusdPrice || 0);
  const assetDPI = (totalDPIValue || 0) * (dpiPrice || 0);
  const assetWETH = (totalWETHValue || 0) * (wethPrice || 0);
  const assetUMA = (totalUMAValue || 0) * (umaPrice || 0);
  const assetIndex = totalIndexCoop ? totalIndexCoop : 0;
  const assetIndexLP = totalIndexLPValue ? totalIndexLPValue : 0;
  const assetIndexBalance = (totalBalanceIndexCoop || 0) * (indexCoopPrice || 0);
  const treasuryAssets = assetYUSD + assetDPI + assetWETH + assetIndexLP + assetIndex + totalSushi + assetUMA;
  const treasuryValue = typeof totalYUsdValue !== "undefined" && totalYUsdValue !== 0 ? "~$" + numeral(treasuryAssets).format("0.00a") : "--";

  const assets = [
    {
      name: "DefiPulse Index",
      index: "DPI",
      quantity: numeral(totalDPIValue).format("0,0.000000"),
      price: "$" + numeral(dpiPrice).format("0,0.000000"),
      change: change24DPI,
      value: "$" + numeral(assetDPI).format("0,0.00"),
    },
    {
      name: "Index",
      index: "INDEX",
      quantity: numeral(totalBalanceIndexCoop).format("0,0.000000"),
      price: "$" + numeral(indexCoopPrice).format("0,0.000000"),
      change: change24IndexCoop,
      value: "$" + numeral(assetIndexBalance).format("0,0.00"),
    },
    {
      name: "UMA Voting Token",
      index: "UMA",
      quantity: numeral(totalUMAValue).format("0,0.000000"),
      price: "$" + numeral(umaPrice).format("0,0.000000"),
      change: change24UMA,
      value: "$" + numeral(assetUMA).format("0,0.00"),
    },
    {
      name: "Wrapped Ether",
      index: "WETH",
      quantity: numeral(totalWETHValue).format("0,0.000000"),
      price: "$" + numeral(wethPrice).format("0,0.000000"),
      change: change24WETH,
      value: "$" + numeral(assetWETH).format("0,0.00"),
    },
    {
      name: "yearn Curve",
      index: "yyDAI+",
      quantity: numeral(totalYUsdValue).format("0,0.000000"),
      price: "$" + numeral(yusdPrice).format("0,0.000000"),
      change: change24YUSD,
      value: "$" + numeral(assetYUSD).format("0,0.00"),
    },
  ];

  return (
    <>
      <Spacer size="lg" />
      <Card>
        <CardTitle text="💰 Treasury Assets" />
        <Spacer size="sm" />
        <CardContent>
          <Box display="grid" alignItems="center" paddingLeft={4} paddingRight={4} paddingBottom={1} row>
            <StyledAssetContentInner>
              <StyledTokenNameMain>Token Name</StyledTokenNameMain>
              <SeparatorGrid orientation={"vertical"} stretch={true} gridArea={"spacer1"} />
              <StyledSymbolMain>Symbol</StyledSymbolMain>
              <SeparatorGrid orientation={"vertical"} stretch={true} gridArea={"spacer2"} />
              <StyledQuantityMain>Quantity</StyledQuantityMain>
              <SeparatorGrid orientation={"vertical"} stretch={true} gridArea={"spacer3"} />
              <StyledPriceMain>Token Price($)</StyledPriceMain>
              <SeparatorGrid orientation={"vertical"} stretch={true} gridArea={"spacer4"} />
              <StyledChangeMain>Change(24h)</StyledChangeMain>
              <SeparatorGrid orientation={"vertical"} stretch={true} gridArea={"spacer5"} />
              <StyledValueMain>Value in USD($)</StyledValueMain>
            </StyledAssetContentInner>
          </Box>
          <Spacer size="sm" />
          {assets && (
            <Surface>
              {assets.map((asset, i) => {
                if (i === 0) {
                  return <AssetEntry key={"asset" + i} prop={asset} />;
                } else {
                  return [<Separator />, <AssetEntry key={"asset" + i} prop={asset} />];
                }
              })}
            </Surface>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export const StyledTokenNameMain = styled.span`
  font-weight: 600;
  display: grid;
  grid-area: name;
  @media (max-width: 768px) {
    flex-flow: column nowrap;
    align-items: flex-start;
  }
`;

export const StyledSymbolMain = styled.span`
  font-weight: 600;
  margin-left: 5px;
  margin-right: 5px;
  display: grid;
  grid-area: symbol;
  justify-content: center;
  min-width: 67px;
  @media (max-width: 768px) {
    flex-flow: column nowrap;
    align-items: flex-start;
  }
`;

export const StyledQuantityMain = styled.span`
  font-weight: 600;
  margin-left: 5px;
  margin-right: 5px;
  display: grid;
  grid-area: quantity;
  justify-content: center;
  min-width: 67px;
  @media (max-width: 768px) {
    flex-flow: column nowrap;
    align-items: flex-start;
  }
`;

export const StyledPriceMain = styled.span`
  font-weight: 600;
  margin-left: 5px;
  margin-right: 5px;
  display: grid;
  grid-area: price;
  justify-content: center;
  min-width: 67px;
  @media (max-width: 768px) {
    flex-flow: column nowrap;
    align-items: flex-start;
  }
`;

export const StyledChangeMain = styled.span`
  font-weight: 600;
  margin-left: 5px;
  margin-right: 5px;
  display: grid;
  grid-area: change;
  justify-content: center;
  min-width: 67px;
  @media (max-width: 768px) {
    flex-flow: column nowrap;
    align-items: flex-start;
  }
`;

export const StyledValueMain = styled.span`
  font-weight: 600;
  margin-left: 5px;
  margin-right: 5px;
  display: grid;
  grid-area: value;
  justify-content: center;
  min-width: 67px;
  @media (max-width: 768px) {
    flex-flow: column nowrap;
    align-items: flex-start;
  }
`;

export default AssetsList;
