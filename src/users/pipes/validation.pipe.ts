import {
    ArgumentMetadata, Injectable, PipeTransform
}
from "@nestjs/common";


@Injectable() 
export class CustomValidationPipe implements PipeTransform {
    transform(value:any, metadata: ArgumentMetadata) {
        console.log(`the value is : ${value}`)
        //write your logic here
        return value;
    }

}
/*
Custom pipes#
As mentioned, you can build your own custom pipes. 
While Nest provides a robust built-in ParseIntPipe and ValidationPipe,
let's build simple custom versions of each from scratch to see how custom pipes are constructed.

We start with a simple ValidationPipe. 
Initially, we'll have it simply take an input value and immediately return the same value,
 behaving like an identity function.

Hint
PipeTransform<T, R> is a generic interface that must be implemented by any pipe.
 The generic interface uses T to indicate the type of the input value, 
 and R to indicate the return type of the transform() method.

Every pipe must implement the transform() method to fulfill the PipeTransform interface contract.
This method has two parameters:

value
metadata
The value parameter is the currently processed method argument (before it is received by the route handling method),
 and metadata is the currently processed method argument's metadata.
  The metadata object has these properties:
  
export interface ArgumentMetadata {
  type: 'body' | 'query' | 'param' | 'custom';
  metatype?: Type<unknown>;
  data?: string;
}
type	Indicates whether the argument is a body @Body(), query @Query(), param @Param(), or a custom parameter 

metatype	Provides the metatype of the argument, 
for example, String. 
Note: the value is undefined if you either omit a type declaration in the route handler method signature, or use vanilla JavaScript.

data	The string passed to the decorator, for example @Body('string'). It's undefined if you leave the decorator parenthesis empty.

Warning
TypeScript interfaces disappear during transpilation. 
Thus, if a method parameter's type is declared as an interface instead of a class,
 the metatype value will be Object.
*/
