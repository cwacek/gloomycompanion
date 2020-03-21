import React from 'react';
import { FormGroup, FormControl, InputGroup, Button, FormLabel } from "react-bootstrap"
import { FaMinus, FaPlus } from "react-icons/fa"


interface IProps<T> {
    label: string
    attribute: T;
    value : number
    onSet : (attribute : T, value : number) => void
    onIncrement : (attribute : T, value : number) => void

}

export function NumericInput<T>(props : IProps<T>) : React.ReactElement {
    return (
      <FormGroup controlId={"" + props.attribute}>
        <FormLabel>{props.label}</FormLabel>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <Button
              variant="outline-secondary"
              onClick={() => props.onIncrement(props.attribute, -1)}
            >
              <FaMinus />
            </Button>
          </InputGroup.Prepend>
          <FormControl
            type="number"
            value={props.value.toString()}
            onChange={(event : React.FormEvent<HTMLInputElement>) =>
              props.onSet(props.attribute, parseInt(event.currentTarget.value!))
            }
          ></FormControl>
          <InputGroup.Append>
            <Button onClick={() => props.onIncrement(props.attribute, 1)}>
              <FaPlus />
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </FormGroup>
    );
}