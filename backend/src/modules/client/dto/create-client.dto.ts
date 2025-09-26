import { IsEmail, IsEnum, IsNotEmpty, IsObject, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ClientType, ClientStatus } from '../schemas/client.schema';

class AddressDto {
  @IsString()
  @IsNotEmpty()
  street: string;

  @IsString()
  @IsNotEmpty()
  number: string;

  @IsString()
  @IsOptional()
  complement?: string;

  @IsString()
  @IsNotEmpty()
  neighborhood: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsString()
  @IsNotEmpty()
  zipCode: string;
}

class ContactDto {
  @IsString()
  @IsNotEmpty()
  primaryName: string;

  @IsString()
  @IsNotEmpty()
  primaryPhone: string;

  @IsEmail()
  primaryEmail: string;

  @IsString()
  @IsOptional()
  secondaryName?: string;

  @IsString()
  @IsOptional()
  secondaryPhone?: string;

  @IsEmail()
  @IsOptional()
  secondaryEmail?: string;
}

class ContractInfoDto {
  @IsString()
  @IsNotEmpty()
  contractNumber: string;

  @IsString()
  @IsNotEmpty()
  startDate: string;

  @IsString()
  @IsOptional()
  endDate?: string;

  @IsEnum(['basic', 'premium', 'enterprise'])
  serviceLevel: 'basic' | 'premium' | 'enterprise';

  @IsString()
  @IsNotEmpty()
  monthlyFee: number;
}

export class CreateClientDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(ClientType)
  type: ClientType;

  @IsEnum(ClientStatus)
  @IsOptional()
  status?: ClientStatus;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @ValidateNested()
  @Type(() => AddressDto)
  address: AddressDto;

  @ValidateNested()
  @Type(() => ContactDto)
  contact: ContactDto;

  @ValidateNested()
  @Type(() => ContractInfoDto)
  @IsOptional()
  contractInfo?: ContractInfoDto;

  @IsObject()
  @IsOptional()
  equipment?: any[];
}
