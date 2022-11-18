import React, { useEffect } from "react";
import { Badge, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { actionFillPaletasAsync } from "../../redux/actions/paletasActions";

const Home = () => {
    const { paletas } = useSelector((store) => store.paletasStore);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(actionFillPaletasAsync())
    }, [dispatch])


    return (
        <div>
            {
                paletas && paletas.length ? (
                    paletas.map((paleta, index) => (
                        <Card key={index} style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={paleta.image} />
                            <Badge bg="warning" text="dark">{paleta.price}</Badge>
                            <Card.Body>
                                <Card.Title>{paleta.name}</Card.Title>
                                <Card.Text>{`${paleta.category}:${paleta.description}`}</Card.Text>
                            </Card.Body>
                        </Card>
                    ))
                ) : (<></>)
            }

        </div>
    )
}
export default Home