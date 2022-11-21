import React, { useEffect } from "react";
import { Badge, Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { actionDeletePaletasAsync, actionFillPaletasAsync } from "../../redux/actions/paletasActions";

const Home = () => {
  const { paletas } = useSelector((store) => store.paletasStore);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(actionFillPaletasAsync());
  }, [dispatch]);

  return (
    <div>
      {paletas && paletas.length ? (
        paletas.map((paleta, index) => (
          <Card key={index} style={{ width: "18rem" }}>
            <Card.Img variant="top" src={paleta.image} />
            <Badge bg="warning" text="dark">
              {paleta.price}
            </Badge>
            <Card.Body>
              <Card.Title>{paleta.name}</Card.Title>
              <Card.Text>{`${paleta.category}:${paleta.description}`}</Card.Text>
              <div className="d-flex gap-2">
                <Button
                  size="sm"
                  variant="light"
                  onClick={() => {
                    navigate(`/edit/${paleta.id}`);
                  }}
                >
                  Edit
                </Button>
                <Button size="sm" variant="danger" onClick={() => {
                    dispatch(actionDeletePaletasAsync(paleta))
                  }}>
                  Delete
                </Button>
              </div>
            </Card.Body>
          </Card>
        ))
      ) : (
        <></>
      )}
    </div>
  );
};
export default Home;
