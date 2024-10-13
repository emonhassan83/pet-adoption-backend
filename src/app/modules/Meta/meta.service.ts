import { UserRole } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { IAuthUser } from "../../interfaces/common";

const fetchDashboardMetaData = async (user: IAuthUser) => {
  let metaData;

  switch (user?.role) {
    case UserRole.SUPER_ADMIN:
      metaData = getSuperAdminMetaData();
      break;
    case UserRole.ADMIN:
      metaData = getAdminMetaData();
      break;
    case UserRole.USER:
      metaData = getUserMetaData(user);
      break;
    default:
      throw new Error("Invalid user role!");
  }

  return metaData;
};

const getSuperAdminMetaData = async () => {
  const userCount = await prisma.user.count();
  const petCount = await prisma.pet.count();
  const adoptionCount = await prisma.adoptionRequest.count();
  const blogCount = await prisma.blog.count();
  const donationCount = await prisma.donation.count();

  const totalRevenue = adoptionCount * 180;

  const barChartData = await getBarChartData();
  const pieCharData = await getPieChartData();

  return {
    userCount,
    petCount,
    adoptionCount,
    blogCount,
    donationCount,
    totalRevenue,
    barChartData,
    pieCharData,
  };
};

const getAdminMetaData = async () => {
  const adminCount = await prisma.user.count({
    where: {
      role: "ADMIN"
    }
  });
  const userCount = await prisma.user.count({
    where: {
      role: "USER"
    }
  });
  const petCount = await prisma.pet.count();
  const popularPetCount = await prisma.pet.count({
    where: {
      adoptionRequest: {
        some: {},
      },
    },
  });
  const adoptionCount = await prisma.adoptionRequest.count();
  const blogCount = await prisma.blog.count();
  const donationCount = await prisma.donation.count();

  const totalRevenue = await prisma.adoptionRequest.count(
  //   {
  //   _sum: { amount: true },
  //   where: {
  //     status: PaymentStatus.PAID,
  //   },
  // }
) * 180;

  const barChartData = await getBarChartData();
  const pieCharData = await getPieChartData();

  return {
    userCount,
    adminCount,
    petCount,
    popularPetCount,
    adoptionCount,
    blogCount,
    donationCount,
    totalRevenue,
    barChartData,
    pieCharData,
  };
};

const getUserMetaData = async (user: IAuthUser) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: user?.email,
    },
  });

  const petCount = await prisma.pet.count({
    where: {
      userId: userData.id,
    },
  });

  const adoptionCount = await prisma.adoptionRequest.count({
    where: {
      userId: userData.id,
    },
  });

  const blogCount = await prisma.blog.count({
    where: {
      userId: userData.id,
    },
  });

  const donationCount = await prisma.donation.count({
    where: {
      userId: userData.id,
    },
  });

  return {
    petCount,
    adoptionCount,
    blogCount,
    donationCount,
  };
};

const getBarChartData = async () => {
  const adoptionCountByMonth: { month: Date; count: bigint }[] =
    await prisma.$queryRaw`
        SELECT DATE_TRUNC('month', "createdAt") AS month,
        CAST(COUNT(*) AS INTEGER) AS count
        FROM "adoptionrequests"
        GROUP BY month
        ORDER BY month ASC
    `;

  return adoptionCountByMonth;
};

const getPieChartData = async () => {
  const adoptionStatusDistribution = await prisma.adoptionRequest.groupBy({
    by: ["status"],
    _count: { id: true },
  });

  const formattedAdoptStatusDistribution =
  adoptionStatusDistribution.map(({ status, _count }) => ({
      status,
      count: Number(_count.id),
    }));

  return formattedAdoptStatusDistribution;
};

export const MetaService = {
  fetchDashboardMetaData,
};
