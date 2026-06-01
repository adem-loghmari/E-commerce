import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";
import {
  Container,
  Box,
  Card,
  CardContent,
  CardHeader,
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
  Alert,
  Grid,
  Divider,
  Stack,
} from "@mui/material";
import {
  ShoppingCart,
  ExpandMore,
  ExpandLess,
  PaymentOutlined,
  LocalShippingOutlined,
  StarOutlineOutlined,
} from "@mui/icons-material";

const Orders = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [allProducts, setAllProducts] = useState([]);
  const navigate = useNavigate();

  const { orders } = useContext(ShopContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/allproducts");
        const data = await response.json();
        setAllProducts(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleOrderDetails = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const filteredOrders = orders.filter((order) => {
    if (filterStatus === "all") return true;
    return order.status === filterStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-purple-100 text-purple-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Box sx={{ textAlign: "center" }}>
            <CircularProgress sx={{ mb: 2 }} />
            <Typography variant="h6" color="textSecondary">
              Loading your orders...
            </Typography>
          </Box>
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, mt: 3 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4, mt: 3 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
          Your Orders
        </Typography>
        <Typography variant="body2" color="textSecondary">
          View and manage your order history
        </Typography>
      </Box>

      {orders.length === 0 ? (
        <Card sx={{ textAlign: "center", p: 4 }}>
          <ShoppingCart sx={{ fontSize: 48, color: "action.disabled", mx: "auto", mb: 2 }} />
          <Typography variant="h6" sx={{ mb: 1 }}>
            No orders yet
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
            You haven't placed any orders yet.
          </Typography>
          <Button variant="contained" onClick={() => navigate("/")} sx={{ textTransform: "none" }}>
            Continue Shopping
          </Button>
        </Card>
      ) : (
        <>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mb: 3, alignItems: "center", justifyContent: "space-between" }}>
            <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", gap: 1 }}>
              {["all", "processing", "shipped", "delivered"].map((status) => (
                <Chip
                  key={status}
                  label={status.charAt(0).toUpperCase() + status.slice(1)}
                  onClick={() => setFilterStatus(status)}
                  variant={filterStatus === status ? "filled" : "outlined"}
                  color={filterStatus === status ? "primary" : "default"}
                />
              ))}
            </Stack>
            <Typography variant="body2" color="textSecondary">
              {filteredOrders.length} {filteredOrders.length === 1 ? "order" : "orders"} found
            </Typography>
          </Stack>

          <Stack spacing={2}>
            {filteredOrders.map((order) => (
              <Card key={order._id}>
                <CardHeader
                  title={
                    <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems={{ xs: "flex-start", sm: "center" }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "primary.main" }}>
                        Order #{order.orderNumber || order.id}
                      </Typography>
                      <Chip
                        label={order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        size="small"
                        color={
                          order.status === "delivered"
                            ? "success"
                            : order.status === "shipped"
                            ? "warning"
                            : order.status === "cancelled"
                            ? "error"
                            : "info"
                        }
                        variant="outlined"
                      />
                    </Stack>
                  }
                  action={
                    <Button
                      size="small"
                      onClick={() => toggleOrderDetails(order._id)}
                      endIcon={expandedOrder === order._id ? <ExpandLess /> : <ExpandMore />}
                      sx={{ textTransform: "none" }}
                    >
                      {expandedOrder === order._id ? "Hide" : "View"}
                    </Button>
                  }
                  sx={{ pb: 2 }}
                />
                <Divider />
                <CardContent>
                  <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="space-between">
                    <Stack spacing={1}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                          <Typography variant="caption" color="textSecondary">
                            📅
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            {formatDate(order.createdAt)}
                          </Typography>
                        </Box>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Typography variant="caption" color="textSecondary">
                          📦
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {order.items?.length || 0} {order.items?.length === 1 ? "item" : "items"}
                        </Typography>
                      </Box>
                    </Stack>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      ${order.total.toFixed(2)}
                    </Typography>
                  </Stack>

                  {expandedOrder === order._id && (
                    <>
                      <Divider sx={{ my: 2 }} />
                      <Grid container spacing={3} sx={{ mt: 0 }}>
                        <Grid item xs={12} sm={6}>
                          <Box sx={{ mb: 2 }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: "bold", mb: 1 }}>
                              <LocalShippingOutlined sx={{ mr: 1, fontSize: 18, verticalAlign: "middle" }} />
                              Shipping Information
                            </Typography>
                            <Stack spacing={0.5}>
                              <Typography variant="caption">
                                <strong>Name:</strong> {order.user.name}
                              </Typography>
                              <Typography variant="caption">
                                <strong>Address:</strong> {order.shippingAddress?.street}
                              </Typography>
                              <Typography variant="caption">
                                <strong>City:</strong> {order.shippingAddress?.city}, {order.shippingAddress?.zipCode}
                              </Typography>
                            </Stack>
                          </Box>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <Box sx={{ mb: 2 }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: "bold", mb: 1 }}>
                              <PaymentOutlined sx={{ mr: 1, fontSize: 18, verticalAlign: "middle" }} />
                              Payment Method
                            </Typography>
                            <Stack direction="row" spacing={1}>
                              <Paper sx={{ p: 1, bgcolor: order.paymentMethod === "paypal" ? "info.light" : "action.hover" }}>
                                {order.paymentMethod === "paypal" ? "🅿️" : "💳"}
                              </Paper>
                              <Stack>
                                <Typography variant="caption" sx={{ fontWeight: "bold" }}>
                                  {order.paymentMethod === "paypal" ? "PayPal" : "Credit/Debit Card"}
                                </Typography>
                                <Typography variant="caption" color="textSecondary">
                                  {order.paymentMethod === "paypal"
                                    ? order.paymentResult?.email || ""
                                    : `Card ending in ${order.paymentInfo?.last4 || "••••"}`}
                                </Typography>
                              </Stack>
                            </Stack>
                          </Box>
                        </Grid>
                      </Grid>

                      <Box sx={{ mt: 3 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: "bold", mb: 2 }}>
                          Order Items
                        </Typography>
                        <TableContainer>
                          <Table size="small">
                            <TableHead sx={{ bgcolor: "action.hover" }}>
                              <TableRow>
                                <TableCell>Product</TableCell>
                                <TableCell align="right">Price</TableCell>
                                <TableCell align="center">Qty</TableCell>
                                <TableCell align="right">Subtotal</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {order.items?.map((item) => {
                                const product = allProducts[item.productId];
                                return (
                                  <TableRow key={`${item.productId}-${order._id}`}>
                                    <TableCell>
                                      <Stack direction="row" spacing={1} alignItems="center">
                                        <Box
                                          component="img"
                                          src={product.image || "/placeholder-product.png"}
                                          alt={product.name || "Product"}
                                          sx={{ width: 40, height: 40, borderRadius: 1, objectFit: "cover" }}
                                        />
                                        <Box>
                                          <Typography variant="caption" sx={{ fontWeight: "bold", display: "block" }}>
                                            {product.name || "Unknown Product"}
                                          </Typography>
                                          <Typography variant="caption" color="textSecondary">
                                            {product.category || ""}
                                          </Typography>
                                        </Box>
                                      </Stack>
                                    </TableCell>
                                    <TableCell align="right">
                                      <Typography variant="caption">
                                        ${product.new_price ? product.new_price.toFixed(2) : "0.00"}
                                      </Typography>
                                    </TableCell>
                                    <TableCell align="center">
                                      <Typography variant="caption">{item.quantity}</Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                      <Typography variant="caption">
                                        ${(product.new_price * item.quantity).toFixed(2)}
                                      </Typography>
                                    </TableCell>
                                  </TableRow>
                                );
                              })}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Box>

                      {order.status === "delivered" && (
                        <Box sx={{ mt: 3, textAlign: "right" }}>
                          <Button
                            variant="contained"
                            startIcon={<StarOutlineOutlined />}
                            sx={{ textTransform: "none" }}
                          >
                            Leave a Review
                          </Button>
                        </Box>
                      )}
                    </>
                  )}
                </CardContent>
              </Card>
            ))}
          </Stack>
        </>
      )}
    </Container>
  );
};

export default Orders;